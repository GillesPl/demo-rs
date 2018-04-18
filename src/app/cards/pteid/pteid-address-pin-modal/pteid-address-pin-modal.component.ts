import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Connector } from '../../../connector.service';
import { EventService } from '../../../event.service';

@Component({
  selector: 'app-pteid-address-pin-modal',
  templateUrl: './pteid-address-pin-modal.component.html',
  styleUrls: ['./pteid-address-pin-modal.component.less']
})
export class PteidAddressPinModalComponent implements OnInit {
  pinpad: boolean;
  readerId;

  constructor(public bsModalRef: BsModalRef, private Connector: Connector, private eventService: EventService) {
    this.eventService.startOver$.subscribe(() => this.cancel());
  }

  static handleVerificationSuccess(comp) {
    comp.eventService.addressPinCheckHandled('verified', false, false);
    comp.bsModalRef.hide();
  }

  static handleVerificationError(err, comp) {
    comp.eventService.addressPinCheckHandled(err, true, false);
    comp.bsModalRef.hide();
  }

  ngOnInit() {
    const comp = this;
    // If pinpad reader, send verification request directly to reader
    if (comp.pinpad) {
      comp.Connector.plugin('pteid', 'address', [comp.readerId], [{}]).then(() => {
        PteidAddressPinModalComponent.handleVerificationSuccess(comp);
      }, err => {
        PteidAddressPinModalComponent.handleVerificationError(err, comp);
      });
    }
    // else, wait until user enters pin
  }

  cancel() {
    this.eventService.addressPinCheckHandled('', false, true);
    this.bsModalRef.hide();
  }

  submitPin(pincode) {
    const comp = this;
    comp.Connector.plugin('pteid', 'verifyPin', [comp.readerId], [{ pin: pincode }])
      .then(() => {
        PteidAddressPinModalComponent.handleVerificationSuccess(comp);
      }, err => {
        PteidAddressPinModalComponent.handleVerificationError(err, comp);
      });
  }
}
