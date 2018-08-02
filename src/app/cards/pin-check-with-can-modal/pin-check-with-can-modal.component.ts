import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Connector } from '../../connector.service';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-pin-check-with-can-modal',
  templateUrl: './pin-check-with-can-modal.component.html',
  styleUrls: ['./pin-check-with-can-modal.component.less']
})
export class PinCheckWithCanModalComponent implements OnInit {
  pinpad: boolean;
  pincode;
  code;
  readerId;
  result: string;
  error: boolean;

  pinType: string;

  constructor(public bsModalRef: BsModalRef, private Connector: Connector, private eventService: EventService) {
    this.eventService.startOver$.subscribe(() => this.cancel());
  }

  static handleVerificationSuccess(comp) {
    comp.eventService.pinCheckHandled('verified', false, false);
    comp.bsModalRef.hide();
  }

  static handleVerificationError(err, comp) {
    comp.eventService.pinCheckHandled(err, true, false);
    comp.bsModalRef.hide();
  }

  ngOnInit() {
    const comp = this;
    // If pinpad reader, send verification request directly to reader
    if (comp.pinpad) {
      comp.Connector.generic('verifyPin', [comp.readerId, {}]).then(res => {
        PinCheckWithCanModalComponent.handleVerificationSuccess(comp);
      }, err => {
        PinCheckWithCanModalComponent.handleVerificationError(err, comp);
      });
    }
    // else, wait until user enters pin
  }

  cancel() {
    this.eventService.pinCheckHandled('', false, true);
    this.bsModalRef.hide();
  }

  submitPin(pincode) {
    const comp = this;
    this.Connector.plugin('luxeid', 'verifyPin',[this.readerId, this.code, this.pinType],[{"pin" : pincode}]).then(res => {
      PinCheckWithCanModalComponent.handleVerificationSuccess(comp);
    }, err => {
      PinCheckWithCanModalComponent.handleVerificationError(err, comp);
    })
  }
}
