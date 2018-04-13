import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { ApiService } from '../../../api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-pteid-viz',
  templateUrl: './pteid-viz.component.html',
  styleUrls: ['./pteid-viz.component.less']
})
export class PteidVizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;

  certStatus;
  addressPinStatus;
  signPinStatus;
  photo;
  certData;
  loadingCerts;
  addressInfo;
  isCollapsed;

  constructor(private API: ApiService, private Connector: Connector) { }

  ngOnInit() {
    const comp = this;
    comp.certStatus = 'checking';
    comp.addressPinStatus = 'idle';
    comp.signPinStatus = 'idle';

    // validate certificate chain
    comp.Connector.plugin('pteid', 'allCerts', [comp.readerId], [ { filter: [], parseCerts: false }]).then(res => {
      comp.API.convertJPEG2000toJPEG(comp.cardData.id.photo).toPromise().then((converted: any) => {
        comp.photo = converted.data.base64Pic;
      });

      const validationReq = {
        certificateChain: [
          { order: 0, certificate: res.data.authentication_certificate.base64 },
          { order: 1, certificate: res.data.root_authentication_certificate.base64 },
          { order: 2, certificate: res.data.root_certificate.base64 },
        ]
      };
      const validationReq2 = {
        certificateChain: [
          { order: 0, certificate: res.data.non_repudiation_certificate.base64 },
          { order: 1, certificate: res.data.root_non_repudiation_certificate.base64 },
          { order: 2, certificate: res.data.root_certificate.base64 },
        ]
      };
      const promises = [ comp.Connector.ocv('validateCertificateChain', [validationReq]),
        comp.Connector.ocv('validateCertificateChain', [validationReq2]) ];

      Promise.all(promises).then(results => {
        let status = 'valid';
        _.forEach(results, valRes => {
          if (!(valRes.crlResponse && valRes.crlResponse.status &&
            valRes.ocspResponse && valRes.ocspResponse.status)) { status = 'invalid'; }
        });
        comp.certStatus = status;
      });
    });
  }

  addressData() {
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/check-pin.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [controller.readerId]).then(res => {
    //         return res.data.pinpad;
    //       })
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'ModalPtAddressPinCheckCtrl'
    // });
    //
    // modal.result.then(function (addressResponse) {
    //   // Analytics.trackEvent('beid', 'pin-correct', 'Correct PIN entered');
    //   controller.addressPinStatus = 'valid';
    //   controller.addressInfo = addressResponse.data;
    // }, function (err) {
    //   // Analytics.trackEvent('beid', 'pin-incorrect', 'Incorrect PIN entered');
    //   switch (err.code) {
    //     case 103:
    //       controller.addressPinStatus = '2remain';
    //       break;
    //     case 104:
    //       controller.addressPinStatus = '1remain';
    //       break;
    //     case 105:
    //       // Analytics.trackEvent('beid', 'pin-blocked', 'Card blocked; too many incorrect attempts');
    //       controller.addressPinStatus = 'blocked';
    //       break;
    //     case 109:
    //       // cancelled on reader
    //       controller.addressPinStatus = 'cancelled';
    //       break;
    //   }
    // });
  }

  checkPin() {
    // // Analytics.trackEvent('button', 'click', 'PIN check clicked');
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/check-pin.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [controller.readerId]).then(res => {
    //         return res.data.pinpad;
    //       })
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'ModalPinCheckCtrl'
    // });
    //
    // modal.result.then(function () {
    //   // Analytics.trackEvent('beid', 'pin-correct', 'Correct PIN entered');
    //   controller.signPinStatus = 'valid';
    // }, function (err) {
    //   // Analytics.trackEvent('beid', 'pin-incorrect', 'Incorrect PIN entered');
    //   switch (err.code) {
    //     case 103:
    //       controller.signPinStatus = '2remain';
    //       break;
    //     case 104:
    //       controller.signPinStatus = '1remain';
    //       break;
    //     case 105:
    //       // Analytics.trackEvent('beid', 'pin-blocked', 'Card blocked; too many incorrect attempts');
    //       controller.signPinStatus = 'blocked';
    //       break;
    //     case 109:
    //       // cancelled on reader
    //       controller.signPinStatus = 'cancelled';
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
        comp.Connector.plugin('pteid', 'allCerts', [comp.readerId], [{ filter: [], parseCerts: false }]).then(res => {
          comp.loadingCerts = false;
          comp.certData = res.data;
          comp.isCollapsed = false;
        });
      }
    }
  }

  downloadSummary() {
    // Analytics.trackEvent('button', 'click', 'Print button clicked');
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/summary-download.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [controller.readerId]).then(res => {
    //         return res.data.pinpad;
    //       })
    //     },
    //     needPinToGenerate: () => {
    //       return false;
    //     },
    //     util: () => {
    //       return PtUtils;
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
