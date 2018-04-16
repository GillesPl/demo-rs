import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FileSaverService } from 'ngx-filesaver';
import { EventService } from '../../../event.service';
import { CardService } from '../../card.service';
import * as _ from 'lodash';
import { Connector } from '../../../connector.service';

@Component({
  selector: 'app-challenge-modal',
  templateUrl: './challenge-modal.component.html',
  styleUrls: ['./challenge-modal.component.less']
})
export class ChallengeModalComponent implements OnInit {
  readerId;
  pincode;
  pinpad;

  constructor(public bsModalRef: BsModalRef,
              private Connector: Connector,
              private eventService: EventService,
              private cardService: CardService,
              private FileSaver: FileSaverService) {
    this.eventService.startOver$.subscribe(() => this.cancel());
  }

  static handleVerificationSuccess(result, comp) {
    console.log(result);
    comp.eventService.challengeHandled(result, false, false);
    comp.bsModalRef.hide();
  }

  static handleVerificationError(err, comp) {
    comp.eventService.challengeHandled(err, true, false);
    comp.bsModalRef.hide();
  }

  ngOnInit() {
    const comp = this;
    // If pinpad reader, send verification request directly to reader
    // TODO only works with non-pinpad readers for now!
    if (comp.pinpad) {
      this.Connector.plugin('ocra', 'challenge',
        [this.readerId], [{ challenge: 'kgg0MTQ4NTkzNZMA', pin: undefined }]).then((res) => {
        ChallengeModalComponent.handleVerificationSuccess(res, comp);
      }, err => {
        ChallengeModalComponent.handleVerificationError(err, comp);
      });
    }
    // else, wait until user enters pin
  }

  ok() {
    this.bsModalRef.hide();
  }

  cancel() {
    this.eventService.challengeHandled('', false, true);
    this.bsModalRef.hide();
  }

  submitPin(pincode) {
    const comp = this;
    this.Connector.plugin('ocra', 'challenge', [this.readerId],
      [{ challenge: 'kgg0MTQ4NTkzNZMA', pin: pincode }]).then((res) => {
      ChallengeModalComponent.handleVerificationSuccess(res, comp);
    }, err => {
      ChallengeModalComponent.handleVerificationError(err, comp);
    });
  }

}
