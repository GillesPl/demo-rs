import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { MobibService } from '../mobib.service';

@Component({
  selector: 'app-mobib-mivb-card',
  templateUrl: './mobib-mivb-card.component.html',
  styleUrls: ['./mobib-mivb-card.component.less']
})
export class MobibMivbCardComponent implements OnInit {
  @Input() cardData;
  dob;
  firstName;
  lastName;
  formattedCardNumber1;
  formattedCardNumber2;

  constructor() { }

  ngOnInit() {
    this.dob = moment(this.cardData['card-issuing'].card_holder_birth_date, MobibService.cardDateFormat())
      .format(MobibService.displayDateFormat());

    const names = _.split(this.cardData['card-issuing'].card_holder_name, '|');
    this.firstName = _.trim(names[0].toLowerCase());
    this.lastName = _.trim(names[1].toLowerCase());

    this.formattedCardNumber1 = this.cardData['card-issuing'].card_holder_id.substr(0, 6) + ' / ';
    this.formattedCardNumber2 =
      this.cardData['card-issuing'].card_holder_id.substr(6, 12) + ' / ' +
      this.cardData['card-issuing'].card_holder_id.substr(18, 1);

  }

}
