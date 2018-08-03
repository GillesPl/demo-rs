import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { EventService } from '../../../event.service';
import { CardService } from '../../card.service';
import { BeidService } from '../beid.service';
import { ModalService } from '../../modal.service';
import { Angulartics2 } from 'angulartics2';

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

  validationArray;
  pinStatus;
  loadingCerts: boolean;
  isCollapsed = true;

  constructor(private angulartics2: Angulartics2,
              private beid: BeidService,
              private Connector: Connector,
              private eventService: EventService,
              private cardService: CardService,
              private modalService: ModalService) {
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results));
  }

  ngOnInit() {
    console.log('start oninit be viz: ');
    const comp = this;
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
      console.log('validation req: ', validationReq);
      comp.validationArray = [ comp.Connector.ocv('validateCertificateChain', [validationReq])];
    });
  }

  checkPin() {
    this.modalService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.pinStatus = this.cardService.determinePinModalResult(pinCheck, 'beid');
  }

/*  toggleCerts() {
    const comp = this;
    comp.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'Extended info clicked'}
    });
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
  }*/

  downloadSummary() {
    this.modalService.openSummaryModalForReader(this.readerId, false, this.beid);
  }

  trackCertificatesClick() {
    this.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'Click on certificates feature'}
    });
  }

}
