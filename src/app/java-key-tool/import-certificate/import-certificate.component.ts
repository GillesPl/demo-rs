import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-import-certificate',
  templateUrl: './import-certificate.component.html',
  styleUrls: ['./import-certificate.component.less']
})
export class ImportCertificateComponent {

  importCertData: CSRData = new CSRData('','','' , '');
  importCertResponse: CSRResponse;
  error: string;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  importCert() {
    if (this.importCertData.entity != '' && this.importCertData.type != '' && this.importCertData.keystore != '' && this.importCertData.alias != '') {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().ImportCertificate(this.importCertData).then(res => {
        this.importCertResponse = res;
      }, err => {
        this.error = err.description;
      });
    }
  }

}

//  certificate Signing Request (CSR) data
export class CSRData {
  constructor(
    public entity: string,
    public type: string,
    public keystore: string,
    public alias: string,
    public sigalg?: string,
    public file?: string,
    public keypass?: string,
    public dname?: string,
    public storepass?: string,
    public storetype?: string,
    public providername?: string,
    public providerclass?: string,
    public providerarg?: string,
    public providerpath?: string
  ) {}
}

//  certificate Signing Request (CSR) response
export class CSRResponse {
  constructor(public data: CSRResponseData , public success: boolean) {
  }
}

export class CSRResponseData {
  constructor(public base64: string, public path?: string) {}
}
