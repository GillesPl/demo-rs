import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OberthurService {

  constructor(private http: HttpClient) { }

  generateXMLToSign() {
    // TODO update urls
    return this.http.post('api/cards/lux/xmltosign', undefined).toPromise().then((res: any) => {
      return res.data;
    });
  }

}
