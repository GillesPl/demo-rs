import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import * as _ from 'lodash';
import { CardService } from '../../card.service';
import { EventService } from '../../../event.service';
import { ModalService } from '../../modal.service';
import { LuxTrustService } from '../lux-trust.service';

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

  constructor(private Connector: Connector,
              private cardService: CardService,
              private eventService: EventService,
              private luxTrust: LuxTrustService,
              private modalService: ModalService) {
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results));
  }

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
    this.modalService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.pinStatus = CardService.determinePinModalResult(pinCheck, 'luxtrust');
  }

  downloadSummary() {
    this.modalService.openSummaryModalForReader(this.readerId, false, this.luxTrust);
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
