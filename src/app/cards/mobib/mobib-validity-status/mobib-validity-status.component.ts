import { Component, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-mobib-validity-status',
  templateUrl: './mobib-validity-status.component.html',
  styleUrls: ['./mobib-validity-status.component.less']
})
export class MobibValidityStatusComponent implements OnChanges {
  @Input() from;
  @Input() to;
  validityDate;
  status;

  constructor() { }

  ngOnChanges() {
    const fromMoment = moment(this.from);
    const toMoment = moment(this.to);
    const nowMoment = moment();
    if (fromMoment > nowMoment) {
      // validity starts in future, show warning
      this.status = 'warning';
      this.validityDate = fromMoment.format('DD.MM.YYYY');
    } else if (toMoment < nowMoment) {
      // validity ended in past, show error
      this.status = 'danger';
      this.validityDate = toMoment.format('DD.MM.YYYY');
    } else {
      // card is valid;
      this.status = 'success';
      this.validityDate = toMoment.format('DD.MM.YYYY');
    }
  }

}
