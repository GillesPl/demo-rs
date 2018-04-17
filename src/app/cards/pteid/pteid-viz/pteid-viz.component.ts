import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { ApiService } from '../../../api.service';
import * as _ from 'lodash';
import { CardService } from '../../card.service';
import { EventService } from '../../../event.service';
import { PteidService } from '../pteid.service';
import { ModalService } from '../../modal.service';
import { Angulartics2 } from 'angulartics2';

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

  constructor(private angulartics2: Angulartics2,
              private API: ApiService,
              private Connector: Connector,
              private cardService: CardService,
              private eventService: EventService,
              private modalService: ModalService,
              private pteid: PteidService) {
    this.eventService.addressPinCheckHandled$.subscribe((results) => this.handleAddressPinCheckResult(results));
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results));
  }

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
    // check address pin
    this.pteid.openAddressPinModalForReader(this.readerId);
  }

  handleAddressPinCheckResult(pinCheck) {
    this.addressPinStatus = this.cardService.determinePinModalResult(pinCheck, 'pteid');
  }

  checkPin() {
    this.modalService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.signPinStatus = this.cardService.determinePinModalResult(pinCheck, 'pteid');
  }

  toggleCerts() {
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
        comp.Connector.plugin('pteid', 'allCerts', [comp.readerId], [{ filter: [], parseCerts: false }]).then(res => {
          comp.loadingCerts = false;
          comp.certData = res.data;
          comp.isCollapsed = false;
        });
      }
    }
  }

  downloadSummary() {
    this.modalService.openSummaryModalForReader(this.readerId, false, this.pteid);
  }

  trackCertificatesClick() {
    this.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'Click on certificates feature'}
    });
  }

}
