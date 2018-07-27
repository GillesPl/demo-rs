import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import {Connector} from '../../../connector.service';
import {EventService} from '../../../event.service';


@Component({
  selector: 'app-pin-reset-modal',
  templateUrl: './pin-reset-modal.component.html',
  styleUrls: ['./pin-reset-modal.component.less']
})
export class PinResetModalComponent implements OnInit {
  pinpad: boolean;
  pukcode;
  newPincode;
  readerId;
  result: string;
  error: boolean;
  title:string;
  cancode:string;
  pinType: string

  constructor(public bsModalRef: BsModalRef, private Connector: Connector, private eventService: EventService) {
    this.eventService.startOver$.subscribe(() => this.cancel());
  }

  ngOnInit() {
  }

  cancel() {
    this.bsModalRef.hide();
  }

  resetPin() {
    let body = new LuxPinResetData(false,false,this.pukcode,this.newPincode);
    this.Connector.plugin('luxeid', 'pinReset', [this.readerId, this.cancode, this.pinType],[body]).then(res => {
      // success notification
      this.bsModalRef.hide();
    }, err => {
      // Error notification
      console.error(err)
    });

  }
}
export class LuxPinResetData {
  constructor(public os_dialog: boolean, public reset_only: boolean, public puk: string, public pin: string) {
  }
}
