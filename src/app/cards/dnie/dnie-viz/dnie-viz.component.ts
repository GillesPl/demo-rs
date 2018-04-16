import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { BsModalRef } from 'ngx-bootstrap';
import { CardService } from '../../card.service';
import { EventService } from '../../../event.service';

@Component({
  selector: 'app-dnie-viz',
  templateUrl: './dnie-viz.component.html',
  styleUrls: ['./dnie-viz.component.less']
})
export class DnieVizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;

  certStatus;
  pinStatus;
  isCollapsed;

  loadingCerts;

  constructor(private Connector: Connector, private cardService: CardService, private eventService: EventService) {
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results));
  }

  ngOnInit() {
    const comp = this;

    comp.certStatus = 'checking';
    comp.pinStatus = 'idle';
    comp.isCollapsed = true;

    console.log(this.cardData);

    const filter = ['authentication-certificate', 'signing-certificate', 'intermediate-certificate'];
    comp.Connector.plugin('dnie', 'allCerts', [this.readerId], filter).then(res => {
      const validationReq = {
        certificateChain: [
          { 'order': 0, certificate: res.data.authentication_certificate.base64 },
          { 'order': 1, certificate: res.data.signing_certificate.base64 },
          { 'order': 2, certificate: res.data.intermediate_certificate.base64 },
        ]
      };
      // Analytics.trackEvent('dnie', 'cert-check', 'Start certificate check');
      comp.Connector.ocv('validateCertificateChain', [validationReq]).then(valRes => {
        if (valRes.crlResponse && valRes.crlResponse.status && valRes.ocspResponse && res.ocspResponse.status) {
          // Analytics.trackEvent('dnie', 'cert-valid', 'Certificates are valid');
          comp.certStatus = 'valid';
        } else {
          // Analytics.trackEvent('dnie', 'cert-invalid', 'Certificates are not valid');
          comp.certStatus = 'invalid';
        }
      }, () => {
        // Analytics.trackEvent('dnie', 'cert-error', 'Error occurred while checking certificate validity');
        comp.certStatus = 'error';
      });
    });
  }

  checkPin() {
    this.cardService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.pinStatus = CardService.determinePinModalResult(pinCheck, 'dnie');
  }

  toggleCerts() {
    // Analytics.trackEvent('button', 'click', 'Extended info clicked');
    this.isCollapsed = !this.isCollapsed;
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
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'BeIDSummaryDownloadCtrl',
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
