import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-export-certificate',
  templateUrl: './export-certificate.component.html',
  styleUrls: ['./export-certificate.component.less']
})
export class ExportCertificateComponent {

  exportCertData: ExportCertData = new ExportCertData('','','', '' );
  exportCertResponse: ExportCertResponse;
  error: string;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  exportCert() {
    if (this.exportCertData.entity != '' && this.exportCertData.type != '' && this.exportCertData.keystore != '' && this.exportCertData.alias != '') {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().ExportCertificate(this.exportCertData).then(res => {
        this.exportCertResponse = res;
      }, err => {
        this.error = err.description;
      });
      this.exportCertData = new ExportCertData('','','', '' );
    }
  }

}

export class ExportCertData {
  constructor(
    public entity: string,
    public type: string,
    public keystore: string,
    public alias: string,
    public file?: string,
    public storepass?: string,
    public storetype?: string,
    public providername?: string,
    public providerclass?: string,
    public providerarg?: string,
    public providerpath?: string
  ) {}
}

export class ExportCertResponse {
  constructor(public data: ExportCertResponseData, public success: boolean) {
  }
}

export class ExportCertResponseData {
  constructor(
    public alias: string,
    public base64?: string,
    public path?: string
  ) {}
}
