import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-lux-trust-viz',
  templateUrl: './lux-trust-viz.component.html',
  styleUrls: ['./lux-trust-viz.component.less']
})
export class LuxTrustVizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;

  certData;
  pinStatus;
  certStatus;
  loadingCerts;

  constructor(private Connector: Connector) { }

  ngOnInit() {
    this.pinStatus = 'idle';
    this.certStatus = 'checking';

    const validationReq1 = {
      certificateChain: [
        { order: 0, certificate: this.cardData.authentication_certificate.base64 },
        { order: 1, certificate: this.cardData.root_certificates[1].base64 },
        { order: 2, certificate: this.cardData.root_certificates[0].base64 },
      ]
    };
    const validationReq2 = {
      certificateChain: [
        { order: 0, certificate: this.cardData.signing_certificate.base64 },
        { order: 1, certificate: this.cardData.root_certificates[1].base64 },
        { order: 2, certificate: this.cardData.root_certificates[0].base64 },
      ]
    };
    const promises = [ this.Connector.ocv('validateCertificateChain', [validationReq1]),
      this.Connector.ocv('validateCertificateChain', [validationReq2]) ];

    Promise.all(promises).then(results => {
      let status = 'valid';
      _.forEach(results, res => {
        if (!(res.crlResponse && res.crlResponse.status && res.ocspResponse && res.ocspResponse.status)) { status = 'invalid'; }
      });
      this.certStatus = status;
    });
  }

  checkPin() {
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/check-pin.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [controller.readerId]).then(res => {
    //         return res.data.pinpad;
    //       });
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'ModalPinCheckCtrl'
    // });
    //
    // modal.result.then(function () {
    //   controller.pinStatus = 'valid';
    // }, function (err) {
    //   switch (err.code) {
    //     case 111:
    //       controller.pinStatus = '4remain';
    //       break;
    //     case 112:
    //       controller.pinStatus = '3remain';
    //       break;
    //     case 103:
    //       controller.pinStatus = '2remain';
    //       break;
    //     case 104:
    //       controller.pinStatus = '1remain';
    //       break;
    //     case 105:
    //       controller.pinStatus = 'blocked';
    //       break;
    //     case 109:
    //       controller.pinStatus = 'cancelled';
    //       break;
    //   }
    // });
  }

  downloadSummary() {
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/summary-download.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [controller.readerId]).then(res => {
    //         return res.data.pinpad;
    //       });
    //     },
    //     needPinToGenerate: () => {
    //       return false;
    //     },
    //     util: () => {
    //       return LuxTrustUtils;
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'SummaryDownloadCtrl',
    //   size: 'lg'
    // });
    //
    // modal.result.then(function () {
    //
    // }, function (err) {
    //
    // });
  }

  sign() {
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/xml-download.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return controller.pinpad;
    //     },
    //     needPinToGenerate: () => {
    //       return false;
    //     },
    //     util: () => {
    //       return LuxTrustUtils;
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'XMLDownloadCtrl',
    //   size: 'lg'
    // });
    //
    // modal.result.then(function () {
    //
    // }, function (err) {
    //
    // });
  }

  toggleCerts() {
    this.certData = !this.certData;
  }
}
