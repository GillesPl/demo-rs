import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';

@Component({
  selector: 'app-beid-viz',
  templateUrl: './beid-viz.component.html',
  styleUrls: ['./beid-viz.component.less']
})
export class BeidVizComponent implements OnInit {
  @Input() rnData;
  @Input() addressData;
  @Input() picData;
  @Input() readerId;
  @Input() certData;

  certStatus;
  pinStatus;
  loadingCerts: boolean;
  isCollapsed = true;

  constructor(private Connector: Connector) { }

  ngOnInit() {
    const comp = this;

    this.certStatus = 'checking';
    this.pinStatus = 'idle';
    const filter = ['authentication-certificate', 'citizen-certificate', 'root-certificate'];
    comp.Connector.plugin('beid', 'allCerts', [comp.readerId], filter).then(res => {
      const validationReq = {
        certificateChain: [
          { order: 0, certificate: res.data.authentication_certificate.base64 },
          { order: 1, certificate: res.data.citizen_certificate.base64 },
          { order: 2, certificate: res.data.root_certificate.base64 },
        ]
      };
      // Analytics.trackEvent('beid', 'cert-check', 'Start certificate check');
      comp.Connector.ocv('validateCertificateChain', [validationReq]).then(validationRes => {
        if (validationRes.crlResponse && validationRes.crlResponse.status &&
          validationRes.ocspResponse && validationRes.ocspResponse.status) {
          // Analytics.trackEvent('beid', 'cert-valid', 'Certificates are valid');
          comp.certStatus = 'valid';
        } else {
          // Analytics.trackEvent('beid', 'cert-invalid', 'Certificates are not valid');
          comp.certStatus = 'invalid';
        }
      }, () => {
        // Analytics.trackEvent('beid', 'cert-error', 'Error occurred while checking certificate validity');
        comp.certStatus = 'error';
      });
    });


    // controller.pinOk = $filter('translate')('CARDS.BEID.PIN_OK');
  }

  checkPin() {
    const comp = this;
    // Analytics.trackEvent('button', 'click', 'PIN check clicked');
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/check-pin.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [comp.readerId]).then(res => {
    //         return res.data.pinpad;
    //       });
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'ModalPinCheckCtrl'
    // });
    //
    // modal.result.then(function () {
    //   // Analytics.trackEvent('beid', 'pin-correct', 'Correct PIN entered');
    //   comp.pinStatus = 'valid';
    // }, function (err) {
    //   // Analytics.trackEvent('beid', 'pin-incorrect', 'Incorrect PIN entered');
    //   switch (err.code) {
    //     case 103:
    //       comp.pinStatus = '2remain';
    //       break;
    //     case 104:
    //       comp.pinStatus = '1remain';
    //       break;
    //     case 105:
    //       // Analytics.trackEvent('beid', 'pin-blocked', 'Card blocked; too many incorrect attempts');
    //       comp.pinStatus = 'blocked';
    //       break;
    //     case 109:
    //       // cancelled on reader
    //       comp.pinStatus = 'cancelled';
    //       break;
    //   }
    // });
  }

  toggleCerts() {
    const comp = this;
    // Analytics.trackEvent('button', 'click', 'Extended info clicked');
    if (!comp.isCollapsed) {
      // comp.certData = undefined;
      comp.isCollapsed = true;
    } else {
      if (!comp.loadingCerts) {
        comp.loadingCerts = true;
        comp.Connector.plugin('beid', 'allCerts', [comp.readerId]).then(res => {
          comp.loadingCerts = false;
          comp.certData = res.data;
          comp.isCollapsed = false;
        });
      }
    }
  }

  downloadSummary() {
    const comp = this;
    // // Analytics.trackEvent('button', 'click', 'Print button clicked');
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/summary-download.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [comp.readerId]).then((res) => {
    //         return res.data.pinpad;
    //       });
    //     },
    //     needPinToGenerate: () => {
    //       return false;
    //     },
    //     util: () => {
    //       return BeUtils;
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

  trackCertificatesClick() {
    // Analytics.trackEvent('button', 'click', 'Click on certificates feature');
  }

}
