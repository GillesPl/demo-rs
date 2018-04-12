import { Injectable } from '@angular/core';
import {EventService} from './event.service';

@Injectable()
export class Connector {

  constructor(private eventService: EventService) {}

  private GCLLib = window['GCLLib'];
  private connector;
  private consent: Promise<any>;

  isGCLAvailable() {
    const service = this;
    return this.init(this.generateConfig()).then(() => {
      return service.core('info').then(() => true);
    }).catch(() => false);
  }

  // TODO make sure connector is initialized before sending requests
  promise() {
    return Promise.resolve(this.connector);
  }

  errorHandler(erroredRequest) {
    if (!erroredRequest.pluginArgs) { erroredRequest.pluginArgs = []; }
    const error = erroredRequest.error;
    if (error.status === 401) {
      // Unauthorized, need to request consent
      if (!this.consent) {
        this.consent = new Promise((resolve => {
          this.eventService.consentRequired();
          this.eventService.consentResult$.subscribe((result) => {
            resolve(result);
          });
        }));
      }

      return this.consent.then(res => {
        this.consent = undefined;
        if (res.data) {
          // consent given, re-fire original request
          if (erroredRequest.plugin) {
            return this.promise().then(conn => {
              return conn[erroredRequest.plugin](...erroredRequest.pluginArgs)[erroredRequest.func](...erroredRequest.args);
            });
          } else { return this.promise().then(conn => { return conn[erroredRequest.func](...erroredRequest.args); }); }
        } else {
          // TODO go to consent-required page
          // $state.go('consent-required');
          return Promise.reject({ noConsent: true });
        }
      }, () => {
        this.consent = undefined;
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
        return Promise.resolve({ error, plugin: 'core', func, args }).then(this.errorHandler);
      });
    });
  }

  generic(func, args?) {
    if (!args) { args = []; }
    return this.promise().then(conn => {
      return conn[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({ error, func, args }).then(this.errorHandler);
      });
    });
  }

  ocv(func, args?) {
    if (!args) { args = []; }
    return this.promise().then(conn => {
      return conn.ocv()[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({ error, plugin: 'ocv', func, args }).then(this.errorHandler);
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
        return Promise.resolve({ error, plugin, func, pluginArgs, args }).then(this.errorHandler);
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
    }, err => {
      service.connector = err.client;
    });
    return Promise.resolve(service.connector);
  }

  generateConfig(agentPort?: number) {
    // return new this.GCLLib.GCLConfig({
    //   apiKey: CONFIG.APIKEY,
    //   gwOrProxyUrl: CONFIG.GW_URL,
    //   gclUrl: CONFIG.GCL_URL,
    //   implicitDownload: CONFIG.IMPLICIT_DOWNLOAD,
    //   agentPort,
    //   osPinDialog: true
    // });

    return new this.GCLLib.GCLConfig({
      apiKey: '7de3b216-ade2-4391-b2e2-86b80bac4d7d',
      gwOrProxyUrl: 'https://accapim.t1t.be:443',
      gclUrl: 'https://localhost:10443/v2',
      implicitDownload: false,
      agentPort,
      osPinDialog: true
    });
  }
}

