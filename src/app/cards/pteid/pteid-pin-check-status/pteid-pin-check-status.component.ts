import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-pteid-pin-check-status',
  templateUrl: './pteid-pin-check-status.component.html',
  styleUrls: ['./pteid-pin-check-status.component.less']
})
export class PteidPinCheckStatusComponent implements OnChanges {
  @Input() status;
  @Input() maxTries;
  @Input() pinCheckFunc;
  remainingTries;

  constructor() { }

  ngOnChanges() {
    // extract number of remaining tries;
    if (_.includes(['4remain', '3remain', '2remain', '1remain'], this.status)) {
      this.remainingTries = this.status.substr(0, 1);
    }
  }

  checkPin() {
    if (!_.includes(['valid', 'blocked'], this.status)) { this.pinCheckFunc(); }
  }

}
