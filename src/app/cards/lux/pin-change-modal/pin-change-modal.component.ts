import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import {Connector} from '../../../connector.service';
import {EventService} from '../../../event.service';


@Component({
  selector: 'app-pin-change-modal',
  templateUrl: './pin-change-modal.component.html',
  styleUrls: ['./pin-change-modal.component.less']
})
export class PinChangeModalComponent implements OnInit {
  pincode;
  newPincode;

  pinType: string;

  pinpad: boolean;
  readerId;
  result: string;
  error: boolean;
  title:string;
  code:string;

  constructor(public bsModalRef: BsModalRef, private Connector: Connector, private eventService: EventService) {
    this.eventService.startOver$.subscribe(() => this.cancel());
  }

  ngOnInit() {
  }

  cancel() {
    this.bsModalRef.hide();
  }

  verifyPin() {
    let body = new LuxPinChangeData(false,this.pincode,this.newPincode);
    this.Connector.plugin('luxeid', 'pinChange', [this.readerId, this.code, this.pinType],[body]).then(res => {
      // success notification
      this.bsModalRef.hide();
    }, err => {
      // Error notification
      console.error(err)
    });

  }
}
export class LuxPinChangeData {
  constructor(public os_dialog: boolean, public old_pin?: string, public new_pin?: string) {
  }
}
