import { Injectable } from '@angular/core';
import {EventService} from './event.service';
import { environment } from '../environments/environment';

@Injectable()
export class Connector {

  constructor(private eventService: EventService) {}

  private GCLLib = window['GCLLib'];
  private connector;
  private consent: Promise<any>;

  // TODO make sure connector is initialized before sending requests
  promise() {
    return Promise.resolve(this.connector);
  }

  errorHandler(erroredRequest) {
    const svc = this;
    if (!erroredRequest.pluginArgs) { erroredRequest.pluginArgs = []; }
    const error = erroredRequest.error;
    if (error.status === 401) {
      // Unauthorized, need to request consent
      if (!svc.consent) {
        svc.consent = new Promise((resolve => {
          svc.eventService.consentRequired(erroredRequest.plugin === 'fileExchange');
          svc.eventService.consentResult$.subscribe((result) => {
            resolve(result);
          });
        }));
      }

      return svc.consent.then(res => {
        svc.consent = undefined;
        if (res.data) {
          // consent given, re-fire original request
          if (erroredRequest.plugin) {
            return svc.promise().then(conn => {
              return conn[erroredRequest.plugin](...erroredRequest.pluginArgs)[erroredRequest.func](...erroredRequest.args);
            });
          } else { return svc.promise().then(conn => { return conn[erroredRequest.func](...erroredRequest.args); }); }
        } else {
          svc.eventService.consentError();
          return Promise.reject({ noConsent: true });
        }
      }, () => {
        svc.consent = undefined;
        // TODO handle error?
        return Promise.reject({ noConsent: true });
      });
    } else {
      return Promise.reject(error);
    }
  }

  core(func, args?) {
    if (!args) { args = []; }
    return this.promise().then(conn => {
      return conn.core()[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({ error, plugin: 'core', func, args }).then(this.errorHandler.bind(this));
      });
    });
  }

  generic(func, args?) {
    if (!args) { args = []; }
    return this.promise().then(conn => {
      return conn[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({ error, func, args }).then(this.errorHandler.bind(this));
      });
    });
  }

  ocv(func, args?) {
    if (!args) { args = []; }
    return this.promise().then(conn => {
      return conn.ocv()[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({ error, plugin: 'ocv', func, args }).then(this.errorHandler.bind(this));
      });
    });
  }

  plugin(plugin, func, pluginArgs?, args?) {
    if (!args) { args = []; }
    if (!pluginArgs) { pluginArgs = []; }
    return this.promise().then(conn => {
      return conn[plugin](...pluginArgs)[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({ error, plugin, func, pluginArgs, args }).then(this.errorHandler.bind(this));
      });
    });
  }

  get() {
    return this.connector;
  }

  // Initialize the T1C connector with some custom config
  init(gclConfig) {
    const service = this;
    service.connector = this.GCLLib.GCLClient.initialize(gclConfig).then(client => {
      service.connector = client;
      return Promise.resolve(service.connector);
    }, err => {
      service.connector = err.client;
      return Promise.reject(err);
    });
    return service.connector;
  }

  generateConfig(agentPort?: number) {
    // retrieve PKCS11Config from local storage
    const pkcs11 = JSON.parse(localStorage.getItem('rmc-pkcs11-config'));

    // generate config
    return new this.GCLLib.GCLConfig({
      apiKey: environment.apiKey,
      gwOrProxyUrl: environment.gwOrProxyUrl,
      gclUrl: environment.gclUrl,
      implicitDownload: environment.implicitDownload,
      agentPort,
      osPinDialog: environment.osPinDialog,
      pkcs11Config: pkcs11
    });
  }
}

