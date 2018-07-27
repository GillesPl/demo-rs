import { Injectable } from '@angular/core';
import { DownloadSummaryModalComponent } from './download-summary-modal/download-summary-modal.component';
import { PinCheckModalComponent } from './pin-check-modal/pin-check-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import { Connector } from '../connector.service';
import { DownloadXmlModalComponent } from './download-xml-modal/download-xml-modal.component';
import { ChallengeModalComponent } from './ocra/challenge-modal/challenge-modal.component';
import { Angulartics2 } from 'angulartics2';
import {PinChangeModalComponent} from './lux/pin-change-modal/pin-change-modal.component';
import {PinUnblockModalComponent} from './lux/pin-unblock-modal/pin-unblock-modal.component';
import {PinResetModalComponent} from './lux/pin-reset-modal/pin-reset-modal.component';
import {PinCheckWithCanModalComponent} from './pin-check-with-can-modal/pin-check-with-can-modal.component';
import {DownloadSummaryPaceModalComponent} from './download-summary-pace-modal/download-summary-pace-modal.component';

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

  openPinWithCanModalForReader(readerId,canCode) {
    const svc = this;
    svc.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'PIN check clicked'}
    });

    this.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        pinpad: res.data.pinpad,
        canCode
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(PinCheckWithCanModalComponent, config);
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
    }, error => {
      console.error(error)
    });
  }

  openSummaryPaceModalForReader(readerId, needPinToGenerate, util, code, pic, signature) {
    const svc = this;
    svc.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        needPinToGenerate,
        pinpad: res.data.pinpad,
        util,
        code,
        pic,
        signature
      };
      const config = {
        backdrop: true,
        class: 'modal-lg',
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(DownloadSummaryPaceModalComponent, config);
    }, error => {
      console.error(error)
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

  openChangePinModalForReader(readerId, title, cancode, pinType) {
    const svc = this;
    svc.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'PIN change clicked'}
    });

    this.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        pinpad: res.data.pinpad,
        title,
        cancode,
        pinType
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(PinChangeModalComponent, config);
    });
  }

  openResetPinModalForReader(readerId, title, cancode, pinType) {
    const svc = this;
    svc.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'PIN reset clicked'}
    });

    this.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        pinpad: res.data.pinpad,
        title,
        cancode,
        pinType
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(PinResetModalComponent, config);
    });
  }

  openUnblockPinModalForReader(readerId, title, cancode, pinType) {
    const svc = this;
    svc.angulartics2.eventTrack.next({
      action: 'click',
      properties: { category: 'button', label: 'PIN unblock clicked'}
    });

    this.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        pinpad: res.data.pinpad,
        title,
        cancode,
        pinType
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(PinUnblockModalComponent, config);
    });
  }
}
