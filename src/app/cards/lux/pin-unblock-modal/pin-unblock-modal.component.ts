import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import {Connector} from '../../../connector.service';
import {EventService} from '../../../event.service';


@Component({
  selector: 'app-pin-unblock-modal',
  templateUrl: './pin-unblock-modal.component.html',
  styleUrls: ['./pin-unblock-modal.component.less']
})
export class PinUnblockModalComponent implements OnInit {
  pinpad: boolean;
  pukcode;

  readerId;
  result: string;
  error: boolean;
  title:string;
  cancode:string;
  pinType:string;

  constructor(public bsModalRef: BsModalRef, private Connector: Connector, private eventService: EventService) {
    this.eventService.startOver$.subscribe(() => this.cancel());
  }

  ngOnInit() {
  }

  cancel() {
    this.bsModalRef.hide();
  }

  unblockPin(pukcode) {
    let body = new LuxPinUnblockData(false,true,pukcode);
    this.Connector.plugin('luxeid', 'pinUnblock', [this.readerId, this.cancode, this.pinType],[body]).then(res => {
      // success notification
      this.bsModalRef.hide();
    }, err => {
      // Error notification
      console.error(err)
    });

  }
}
export class LuxPinUnblockData {
  constructor(public os_dialog: boolean, public reset_only: boolean, public puk?: string) {
  }
}
