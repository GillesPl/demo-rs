import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';

@Component({
  selector: 'app-oberthur-viz',
  templateUrl: './oberthur-viz.component.html',
  styleUrls: ['./oberthur-viz.component.less']
})
export class OberthurVizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;

  doCollapse;
  certStatus;
  pinStatus;

  constructor(private Connector: Connector) { }

  ngOnInit() {
    const comp = this;
    comp.certStatus = 'checking';
    comp.pinStatus = 'idle';

    comp.doCollapse = true;

    const validationReq = {
      certificateChain: [
        { order: 0, certificate: comp.cardData.authentication_certificate.base64 },
        { order: 1, certificate: comp.cardData.issuer_certificate.base64 },
        { order: 2, certificate: comp.cardData.root_certificate.base64 }
      ]
    };
    // Analytics.trackEvent('oberthur', 'cert-check', 'Start certificate check');
    this.Connector.ocv('validateCertificateChain', [validationReq]).then(res => {
      if (res.crlResponse && res.crlResponse.status && res.ocspResponse && res.ocspResponse.status) {
        // Analytics.trackEvent('oberthur', 'cert-valid', 'Certificates are valid');
        comp.certStatus = 'valid';
      }
      else {
        // Analytics.trackEvent('oberthur', 'cert-invalid', 'Certificates are not valid');
        comp.certStatus = 'invalid';
      }
    }, () => {
      // Analytics.trackEvent('oberthur', 'cert-error', 'Error occurred while checking certificate validity');
      comp.certStatus = 'error';
    });

  }


  checkPin() {
    // Analytics.trackEvent('button', 'click', 'PIN check clicked');
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/check-pin.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return false;
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'ModalPinCheckCtrl'
    // });
    //
    // modal.result.then(function () {
    //   Analytics.trackEvent('oberthur', 'pin-correct', 'Correct PIN entered');
    //   controller.pinStatus = 'valid';
    // }, function (err) {
    //   Analytics.trackEvent('oberthur', 'pin-incorrect', 'Incorrect PIN entered');
    //   switch (err.code) {
    //     case 103:
    //       controller.pinStatus = '2remain';
    //       break;
    //     case 104:
    //       controller.pinStatus = '1remain';
    //       break;
    //     case 105:
    //       Analytics.trackEvent('oberthur', 'pin-blocked', 'Card blocked; too many incorrect attempts');
    //       controller.pinStatus = 'blocked';
    //       break;
    //   }
    // });
  }

  toggleCerts() {
    // Analytics.trackEvent('button', 'click', 'Extended info clicked');
    this.doCollapse = !this.doCollapse;
  }

  sign() {
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/xml-download.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       // Oberthur cards can have very long pins, incompatible with pin card readers
    //       return false;
    //     },
    //     needPinToGenerate: () => {
    //       return false;
    //     },
    //     util: () => {
    //       return OberthurUtils;
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

  trackCertificatesClick() {
    // Analytics.trackEvent('button', 'click', 'Click on certificates feature');
  }
}
