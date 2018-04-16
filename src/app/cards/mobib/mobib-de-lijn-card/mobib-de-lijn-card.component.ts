import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MobibService } from '../mobib.service';

@Component({
  selector: 'app-mobib-de-lijn-card',
  templateUrl: './mobib-de-lijn-card.component.html',
  styleUrls: ['./mobib-de-lijn-card.component.less']
})
export class MobibDeLijnCardComponent implements OnInit {
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
    this.firstName = _.trim(names[0]);
    this.lastName = _.trim(names[1]);

    this.formattedCardNumber1 = this.cardData['card-issuing'].card_holder_id.substr(0, 6);
    this.formattedCardNumber2 = this.cardData['card-issuing'].card_holder_id.substr(6, 13);
  }

}
