import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { CardService } from '../../card.service';
import { EventService } from '../../../event.service';
import { ModalService } from '../../modal.service';
import { OberthurService } from '../oberthur.service';
import { Angulartics2 } from 'angulartics2';

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

  constructor(private angulartics2: Angulartics2,
              private Connector: Connector,
              private cardService: CardService,
              private eventService: EventService,
              private modalService: ModalService,
              private oberthur: OberthurService) {
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
    comp.angulartics2.eventTrack.next({
      action: 'cert-check',
      properties: { category: 'oberthur', label: 'Start certificate check'}
    });
    this.Connector.ocv('validateCertificateChain', [validationReq]).then(res => {
      if (res.crlResponse && res.crlResponse.status && res.ocspResponse && res.ocspResponse.status) {
        comp.angulartics2.eventTrack.next({
          action: 'cert-valid',
          properties: { category: 'oberthur', label: 'Certificates are valid'}
        });
        comp.certStatus = 'valid';
      } else {
        comp.angulartics2.eventTrack.next({
          action: 'cert-invalid',
          properties: { category: 'oberthur', label: 'Certificates are not valid'}
        });
        comp.certStatus = 'invalid';
      }
    }, () => {
      comp.angulartics2.eventTrack.next({
        action: 'cert-error',
        properties: { category: 'oberthur', label: 'Error occurred while checking certificate validity'}
      });
      comp.certStatus = 'error';
    });

  }

  checkPin() {
    this.modalService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.pinStatus = this.cardService.determinePinModalResult(pinCheck, 'oberthur');
  }

  toggleCerts() {
    this.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'Extended info clicked'}
    });
    // Analytics.trackEvent('button', 'click', 'Extended info clicked');
    this.doCollapse = !this.doCollapse;
  }

  sign() {
    this.modalService.openXmlModalForReader(this.readerId, false, this.oberthur);
  }

  trackCertificatesClick() {
    this.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'Click on certificates feature'}
    });
  }
}
