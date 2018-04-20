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
  validationArray;
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
    this.validationArray = [ this.Connector.ocv('validateCertificateChain', [validationReq1]),
      this.Connector.ocv('validateCertificateChain', [validationReq2]) ];
  }

  checkPin() {
    this.modalService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.pinStatus = this.cardService.determinePinModalResult(pinCheck, 'luxtrust');
  }

  downloadSummary() {
    this.modalService.openSummaryModalForReader(this.readerId, false, this.luxTrust);
  }

  sign() {
    this.modalService.openXmlModalForReader(this.readerId, false, this.luxTrust);
  }

  toggleCerts() {
    this.certData = !this.certData;
  }
}
