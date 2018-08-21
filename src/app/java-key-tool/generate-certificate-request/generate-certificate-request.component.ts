import {Component, OnInit} from '@angular/core';
import {EventService} from '../../event.service';
import {Connector} from '../../connector.service';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

@Component({
  selector: 'app-generate-certificate-request',
  templateUrl: './generate-certificate-request.component.html',
  styleUrls: ['./generate-certificate-request.component.less']
})
export class GenerateCertificateRequestComponent implements OnInit {

  csrdata: CSRData = new CSRData('','','');
  csrResponse;
  error: string;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  ngOnInit(): void {
  }

  createCertificateRequest() {
    this.reset();
    if (this.csrdata.entity != '' && this.csrdata.type != '' && this.csrdata.keystore != '') {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().GenerateCertificateRequest(this.csrdata).then(res => {
        this.csrResponse = res.data
      }, err => {
        this.error = err.description;
      });
      this.csrdata = new CSRData('','','');
    }

  }
  reset() {
    this.error = null;
    this.csrResponse = null;
  }

}

export class CSRData {
  constructor(
    public entity: string,
    public type: string,
    public keystore: string,
    public alias?: string,
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
