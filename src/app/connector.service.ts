import {Injectable} from '@angular/core';
import {EventService} from './event.service';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GCLClient, GCLConfig, GCLConfigOptions} from 'trust1connector';

@Injectable()
export class Connector {

  constructor(private http: HttpClient, private eventService: EventService) {
  }

  private connector;
  private consent: Promise<any>;

  // TODO make sure connector is initialized before sending requests
  promise() {
    return Promise.resolve(this.connector);
  }

  errorHandler(erroredRequest) {
    console.log(erroredRequest);
    const svc = this;
    if (!erroredRequest.pluginArgs) {
      erroredRequest.pluginArgs = [];
    }
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
          } else {
            return svc.promise().then(conn => conn[erroredRequest.func](...erroredRequest.args));
          }
        } else {
          svc.eventService.consentError();
          return Promise.reject({noConsent: true});
        }
      }, () => {
        svc.consent = undefined;
        // TODO handle error?
        return Promise.reject({noConsent: true});
      });
    } else if (error.status === 400 && error.code === '205') {
      // jwt expired, refresh
      // re-use current agentPort!
      return svc.generateConfig(svc.connector.config().agentPort).then(cfg => {
        return svc.init(cfg).then(() => {
          if (erroredRequest.plugin) {
            return svc.promise().then(conn => {
              return conn[erroredRequest.plugin](...erroredRequest.pluginArgs)[erroredRequest.func](...erroredRequest.args);
            });
          } else {
            return svc.promise().then(conn => {
              return conn[erroredRequest.func](...erroredRequest.args);
            });
          }
        });
      });
    } else {
      return Promise.reject(error);
    }
  }

  core(func, args?) {
    if (!args) {
      args = [];
    }
    return this.promise().then(conn => {
      return conn.core()[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({error, plugin: 'core', func, args}).then(this.errorHandler.bind(this));
      });
    });
  }

  generic(func, args?) {
    if (!args) {
      args = [];
    }
    return this.promise().then(conn => {
      return conn[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({error, func, args}).then(this.errorHandler.bind(this));
      });
    });
  }

  ocv(func, args?) {
    if (!args) {
      args = [];
    }
    return this.promise().then(conn => {
      return conn.ocv()[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({error, plugin: 'ocv', func, args}).then(this.errorHandler.bind(this));
      });
    });
  }

  plugin(plugin, func, pluginArgs?, args?) {
    if (!args) {
      args = [];
    }
    if (!pluginArgs) {
      pluginArgs = [];
    }
    return this.promise().then(conn => {
      return conn[plugin](...pluginArgs)[func](...args).then(res => {
        return Promise.resolve(res);
      }, error => {
        return Promise.resolve({error, plugin, func, pluginArgs, args}).then(this.errorHandler.bind(this));
      });
    });
  }

  get() {
    return this.connector;
  }

  // Initialize the T1C connector with some custom config
  init(gclConfig) {
    const service = this;
    service.connector = GCLClient.initialize(gclConfig).then(client => {
      service.connector = client;
      return Promise.resolve(service.connector);
    }, err => {
      service.connector = err.client;
      return Promise.reject(err);
    });
    return service.connector;
  }

  private getJWt() {
    return this.http.get('/api/jwt');
  }

  generateConfig(agentPort?: number) {
    // retrieve PKCS11Config from local storage
    const pkcs11 = JSON.parse(localStorage.getItem('rmc-pkcs11-config'));
    const svc = this;
    return svc.getJWt().toPromise().then((res: { token: string }) => {
      const configoptions = new GCLConfigOptions(
        environment.gclUrl,
        environment.gwOrProxyUrl,
        undefined,
        res.token,
        environment.ocvContextPath,
        environment.dsContextPath,
        undefined,
        pkcs11,
        agentPort,
        environment.implicitDownload,
        undefined,
        undefined,
        environment.consentDuration,
        environment.consentTimeout,
        undefined,
        environment.osPinDialog,
        undefined,
        undefined,
        'nl');
      return new GCLConfig(configoptions);
    });
  }
}

