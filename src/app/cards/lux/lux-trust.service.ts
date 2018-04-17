import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class LuxTrustService {

  constructor(private http: HttpClient) { }

  generateSummaryToSign(readerId) {
    const data = {
      printDate: moment().format('MMMM D, YYYY'),
      printedBy: environment.name + ' v' + environment.version
    };

    return this.http.post('api/cards/luxtrust/summarytosign', data).toPromise();
  }

  generateXMLToSign(readerId) {
    return this.http.post('api/cards/lux/xmltosign', undefined).toPromise();
  }
}
