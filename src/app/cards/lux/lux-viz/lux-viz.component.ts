import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { ApiService } from '../../../api.service';
import * as _ from 'lodash';
import { LuxService } from '../lux.service';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-lux-viz',
  templateUrl: './lux-viz.component.html',
  styleUrls: ['./lux-viz.component.less']
})
export class LuxVizComponent implements OnInit {
  @Input() readerId;

  certData;
  pinpad: boolean;
  needCan: boolean;
  readingData: boolean;
  canCode: string;
  pincode;
  pinStatus;
  validationArray;
  biometricData;
  signatureObject;
  picData;
  pic;
  signature;


  authCert;
  nonRepCert;
  rootCerts;
  loadingCerts;

  constructor(private API: ApiService, private Connector: Connector,
              private lux: LuxService, private modalService: ModalService) { }

  ngOnInit() {
    this.needCan = true;
    const comp = this;
    // check type of reader
    comp.Connector.core('reader', [comp.readerId]).then(res => {
      this.pinpad = res.data.pinpad;
      if (!this.pinpad) {
        comp.pincode = { value: '' };
      } else {
        // launch data request
        comp.getAllData(null);
      }
    });
  }

  //implementation for check pin status component
  checkPin() {

}

  resetPin() {

  }

  unblockPin() {
    this.modalService.openPinModalForReader(this.readerId)
  }

  changePin() {
    this.modalService.openChangePinModalForReader(this.readerId, 'Change pin');
  }

  submitCan(canCode) {
    this.needCan = false;
    this.canCode = canCode;
    this.getAllData(canCode);
  }

  downloadSummary() {
    this.modalService.openSummaryModalForReader(this.readerId, true, this.lux);
  }

  toggleCerts() {
    this.certData = !this.certData;
  }

  getAllData(can) {
    const comp = this;
    this.readingData = true;
    comp.Connector.plugin('luxeid', 'allData', [comp.readerId, can]).then(res => {
      comp.pinStatus = 'valid';
      comp.biometricData = res.data.biometric;
      comp.signatureObject = res.data.signature_object;
      comp.picData = res.data.picture;

      const conversions = [];

      conversions.push(comp.API.convertJPEG2000toJPEG(comp.picData.image));

      if (!_.isEmpty(res.data.signature_image) && !_.isEmpty(res.data.signature_image.image)) {
        conversions.push(comp.API.convertJPEG2000toJPEG(res.data.signature_image.image));
      }

      Promise.all(conversions).then(converted => {
        comp.pic = converted[0].data.base64Pic;
        if (!_.isEmpty(converted[1])) { comp.signature = converted[1].data.base64Pic; }
      });

      comp.authCert = res.data.authentication_certificate.base64;
      comp.nonRepCert = res.data.non_repudiation_certificate.base64;
      comp.rootCerts = _.map(res.data.root_certificates, 'base64');

      comp.readingData = false;

      const validationReq1 = {
        certificateChain: [
          { order: 0, certificate: res.data.authentication_certificate.base64 },
          { order: 1, certificate: res.data.root_certificates[1].base64 },
          { order: 2, certificate: res.data.root_certificates[0].base64 },
        ]
      };
      const validationReq2 = {
        certificateChain: [
          { order: 0, certificate: res.data.non_repudiation_certificate.base64 },
          { order: 1, certificate: res.data.root_certificates[1].base64 },
          { order: 2, certificate: res.data.root_certificates[0].base64 },
        ]
      };
      comp.validationArray = [ comp.Connector.ocv('validateCertificateChain', [validationReq1]),
        comp.Connector.ocv('validateCertificateChain', [validationReq2]) ];
    });
  }
}
