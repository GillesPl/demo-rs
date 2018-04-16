import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { CardService } from '../../card.service';
import { EventService } from '../../../event.service';

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
  loadingCerts;

  constructor(private Connector: Connector, private cardService: CardService, private eventService: EventService) {
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results));
  }

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
    this.cardService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.pinStatus = CardService.determinePinModalResult(pinCheck, 'oberthur');
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
