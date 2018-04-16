import { Injectable } from '@angular/core';
import { DownloadSummaryModalComponent } from './download-summary-modal/download-summary-modal.component';
import { PinCheckModalComponent } from './pin-check-modal/pin-check-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import { Connector } from '../connector.service';

@Injectable()
export class ModalService {

  constructor(private Connector: Connector, private modalService: BsModalService) { }

  openPinModalForReader(readerId) {
    const svc = this;
    // Analytics.trackEvent('button', 'click', 'PIN check clicked');

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
}
