import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';
import { EventService } from '../../../event.service';
import * as _ from 'lodash';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-ocra-viz',
  templateUrl: './ocra-viz.component.html',
  styleUrls: ['./ocra-viz.component.less']
})
export class OcraVizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;

  pinStatus;

  formattedChallenge;
  otpResult: { challenge: string, counter: string };

  constructor(private angulartics2: Angulartics2,
              private eventService: EventService,
              private modalService: ModalService) {
    this.eventService.challengeHandled$.subscribe((results) => this.handleChallengeResult(results));
  }

  ngOnInit() {
  }

  challenge() {
    this.modalService.openChallengeModalForReader(this.readerId);
  }

  handleChallengeResult(challengeCheck) {
    const comp = this;
    // check if the request was cancelled, if it was, we don't need to do anything
    if (!challengeCheck.cancelled) {
      if (challengeCheck.error) {
        comp.angulartics2.eventTrack.next({
          action: 'pin-incorrect',
          properties: { category: 'ocra', label: 'Incorrect PIN entered'}
        });
        switch (challengeCheck.result.code) {
          case 111:
            comp.pinStatus = '4remain';
            break;
          case 112:
            comp.pinStatus = '3remain';
            break;
          case 103:
            comp.pinStatus = '2remain';
            break;
          case 104:
            comp.pinStatus = '1remain';
            break;
          case 105:
            comp.angulartics2.eventTrack.next({
              action: 'pin-blocked',
              properties: { category: 'ocra', label: 'Card blocked; too many incorrect attempts'}
            });
            comp.pinStatus = 'blocked';
            break;
          case 109:
            // cancelled on reader
            comp.pinStatus = 'cancelled';
            break;
        }
      } else {
        comp.angulartics2.eventTrack.next({
          action: 'pin-correct',
          properties: { category: 'ocra', label: 'Correct PIN entered'}
        });
        comp.pinStatus = undefined;
        comp.otpResult = challengeCheck.result;
        const toString = _.padStart(challengeCheck.result.data.toString(), 8, '0');
        comp.formattedChallenge = toString.substr(0, 4) + ' ' + toString.substr(4, 4);
      }
    }
  }
}
