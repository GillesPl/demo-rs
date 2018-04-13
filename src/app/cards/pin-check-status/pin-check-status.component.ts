import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-pin-check-status',
  templateUrl: './pin-check-status.component.html',
  styleUrls: ['./pin-check-status.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PinCheckStatusComponent implements OnChanges {
  @Input() status;
  @Input() maxTries;
  @Input() okText;
  @Input() pinCheckFunc;
  remainingTries = 4;

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
