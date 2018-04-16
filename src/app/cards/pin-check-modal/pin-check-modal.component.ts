import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Connector } from '../../connector.service';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-pin-check-modal',
  templateUrl: './pin-check-modal.component.html',
  styleUrls: ['./pin-check-modal.component.less']
})
export class PinCheckModalComponent implements OnInit {
  pinpad: boolean;
  pincode;
  readerId;
  result: string;
  error: boolean;

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
        PinCheckModalComponent.handleVerificationSuccess(comp);
      }, err => {
        PinCheckModalComponent.handleVerificationError(err, comp);
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
    comp.Connector.generic('verifyPin', [comp.readerId, { pin: pincode }])
      .then(res => {
        PinCheckModalComponent.handleVerificationSuccess(comp);
      }, err => {
        PinCheckModalComponent.handleVerificationError(err, comp);
      });
  }
}
