import { Injectable } from '@angular/core';
import { DownloadSummaryModalComponent } from './download-summary-modal/download-summary-modal.component';
import { PinCheckModalComponent } from './pin-check-modal/pin-check-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import { Connector } from '../connector.service';
import { DownloadXmlModalComponent } from './download-xml-modal/download-xml-modal.component';
import { ChallengeModalComponent } from './ocra/challenge-modal/challenge-modal.component';
import { Angulartics2 } from 'angulartics2';

@Injectable()
export class ModalService {

  constructor(private angulartics2: Angulartics2, private Connector: Connector, private modalService: BsModalService) { }

  openChallengeModalForReader(readerId) {
    const svc = this;
    svc.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'Challenge clicked'}
    });

    this.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        pinpad: res.data.pinpad
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(ChallengeModalComponent, config);
    });
  }

  openPinModalForReader(readerId) {
    const svc = this;
    svc.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'PIN check clicked'}
    });

    this.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        pinpad: res.data.pinpad
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(PinCheckModalComponent, config);
    });
  }

  openSummaryModalForReader(readerId, needPinToGenerate, util) {
    const svc = this;
    svc.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        needPinToGenerate,
        pinpad: res.data.pinpad,
        util
      };
      const config = {
        backdrop: true,
        class: 'modal-lg',
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(DownloadSummaryModalComponent, config);
    });
  }

  openXmlModalForReader(readerId, needPinToGenerate, util) {
    const svc = this;
    svc.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        needPinToGenerate,
        pinpad: res.data.pinpad,
        util
      };
      const config = {
        backdrop: true,
        class: 'modal-lg',
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(DownloadXmlModalComponent, config);
    });
  }
}
