import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LuxTrustService {

  constructor(private http: HttpClient) { }

  generateSummaryToSign(readerId) {
    const data = {
      printDate: moment().format('MMMM D, YYYY'),
      printedBy: '@@name v@@version'
    };

    return this.http.post('api/cards/luxtrust/summarytosign', data).toPromise().then((res: any) => {
      return res.data;
    });
  }

  generateXMLToSign(readerId) {
    return this.http.post('api/cards/lux/xmltosign', undefined).toPromise().then((res: any) => {
      return res.data;
    });
  }
}
