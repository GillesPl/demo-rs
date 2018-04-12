import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import {Connector} from './connector.service';

@Injectable()
export class ApiService {

  constructor(private Connector: Connector, private http: HttpClient) { }


  convertJPEG2000toJPEG(base64JPEG2000) {
    const data = {
      base64: base64JPEG2000
    };
    return this.http.post('/api/jp2tojpeg', data);
  }

  signboxVersion() {
    return this.http.get('/api/version');
  }

  storeUnknownCardInfo(card, description) {
    const data = {
      type: 'UnknownCard',
      atr: card.atr,
      payload: createPayload()
    };
    return this.http.post('/api/unknown-card', data);

    function createPayload() {
      const payload = [];
      _.forEach(card, function (value, key) {
        if (key !== 'atr') { payload.push({ name: key, value: value }); }
      });
      if (description) { payload.push({ name: 'user description', value: description }); }
      return payload;
    }
  }

  storeDownloadInfo(mail, mailOptIn, dlUrl) {
    const service = this;
    const promises = [ this.http.get('//ipinfo.io').toPromise().then(function (data) {
      return data;
    }, function () {
      return {};
    }), this.Connector.core('infoBrowser').then(data => {
      return data;
    }, function () {
      return {};
    })];

    Promise.all(promises).then(function (results) {
      const data = {
        email: mail,
        emailOptIn: mailOptIn,
        dlUrl: dlUrl,
        platformName: results[1].data.os.name,
        type: 'GCLdownload',
        payload: createPayload(results[0].data, results[1].data)
      };
      return service.http.post('/api/dl', data).toPromise();
    }, function (err) {
      console.log(err);
    });

    function createPayload(ipInfo, browserInfo) {
      const payload = [];
      _.forEach(ipInfo, function (value, key) {
        payload.push({ name: key, value: value});
      });
      _.forEach(browserInfo, function (value, key) {
        payload.push({ name: key, value: value});
      });
      return payload;
    }
  }

}
