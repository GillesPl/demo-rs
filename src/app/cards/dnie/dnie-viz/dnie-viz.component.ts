import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { BsModalRef } from 'ngx-bootstrap';
import { CardService } from '../../card.service';
import { EventService } from '../../../event.service';
import { ModalService } from '../../modal.service';
import { DnieService } from '../dnie.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-dnie-viz',
  templateUrl: './dnie-viz.component.html',
  styleUrls: ['./dnie-viz.component.less']
})
export class DnieVizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;

  validationArray;
  pinStatus;
  isCollapsed;

  loadingCerts;

  constructor(private angulartics2: Angulartics2,
              private Connector: Connector,
              private cardService: CardService,
              private dnie: DnieService,
              private eventService: EventService,
              private modalService: ModalService) {
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results));
  }

  ngOnInit() {
    const comp = this;
    comp.pinStatus = 'idle';
    comp.isCollapsed = true;

    const filter = ['authentication-certificate', 'signing-certificate', 'intermediate-certificate'];
    comp.Connector.plugin('dnie', 'allCerts', [this.readerId], filter).then(res => {
      const validationReq = {
        certificateChain: [
          { 'order': 0, certificate: res.data.authentication_certificate.base64 },
          { 'order': 1, certificate: res.data.signing_certificate.base64 },
          { 'order': 2, certificate: res.data.intermediate_certificate.base64 },
        ]
      };
      comp.validationArray = [ comp.Connector.ocv('validateCertificateChain', [validationReq])];
    });
  }

  checkPin() {
    this.modalService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.pinStatus = this.cardService.determinePinModalResult(pinCheck, 'dnie');
  }

  toggleCerts() {
    this.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'Extended info clicked'}
    });
    this.isCollapsed = !this.isCollapsed;
  }

  downloadSummary() {
    this.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'Print button clicked' }
    });
    this.modalService.openSummaryModalForReader(this.readerId, false, this.dnie);
  }

  trackCertificatesClick() {
    this.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'Click on certificates feature'}
    });
  }

}
