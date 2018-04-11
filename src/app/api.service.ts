import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }


  convertJPEG2000toJPEG(base64JPEG2000) {
    const data = {
      base64: base64JPEG2000
    };
    return this.http.post('/api/jp2tojpeg', data);
  }

  signboxVersion() {
    return this.http.get('/api/version');
  }

  // storeUnknownCardInfo(card, description) {
  //   let data = {
  //     type: 'UnknownCard',
  //     atr: card.atr,
  //     payload: createPayload(card, description)
  //   };
  //   return this.http.post('/api/unknown-card', data);
  //
  //   function createPayload(card, description) {
  //     let payload = [];
  //     _.forEach(card, function (value, key) {
  //       if (key !== 'atr') payload.push({ name: key, value: value });
  //     });
  //     if (description) payload.push({ name: 'user description', value: description });
  //     return payload;
  //   }
  // }

  // storeDownloadInfo(mail, mailOptIn, dlUrl) {
  //   let promises = [ $http.get('//ipinfo.io').then(function (data) {
  //     return data;
  //   }, function () {
  //     return {};
  //   }), Connector.core('infoBrowser').then(function (data) {
  //     return data;
  //   }, function () {
  //     return {};
  //   })];
  //
  //   $q.all(promises).then(function (results) {
  //     let data = {
  //       email: mail,
  //       emailOptIn: mailOptIn,
  //       dlUrl: dlUrl,
  //       platformName: results[1].data.os.name,
  //       type: 'GCLdownload',
  //       payload: createPayload(results[0].data, results[1].data)
  //     };
  //     return $http.post('/api/dl', data);
  //   }, function (err) {
  //     console.log(err);
  //   });
  //
  //   function createPayload(ipInfo, browserInfo) {
  //     let payload = [];
  //     _.forEach(ipInfo, function (value, key) {
  //       payload.push({ name: key, value: value});
  //     });
  //     _.forEach(browserInfo, function (value, key) {
  //       payload.push({ name: key, value: value});
  //     });
  //     return payload;
  //   }
  // }

}
