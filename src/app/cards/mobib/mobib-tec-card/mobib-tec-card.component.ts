import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { MobibService } from '../mobib.service';

@Component({
  selector: 'app-mobib-tec-card',
  templateUrl: './mobib-tec-card.component.html',
  styleUrls: ['./mobib-tec-card.component.less']
})
export class MobibTecCardComponent implements OnInit {
  @Input() cardData;
  dob;
  cardExpiration;
  firstName;
  lastName;
  formattedCardNumber1;
  formattedCardNumber2;

  constructor() { }

  ngOnInit() {
    this.dob = moment(this.cardData['card-issuing'].card_holder_birth_date, MobibService.cardDateFormat())
      .format(MobibService.displayDateFormat());
    this.cardExpiration = moment(this.cardData['card-issuing'].card_expiration_date, MobibService.cardDateFormat())
      .format('MM/YYYY');

    const names = _.split(this.cardData['card-issuing'].card_holder_name, '|');
    this.firstName = _.trim(names[0]);
    this.lastName = _.trim(names[1]);

    this.formattedCardNumber1 = this.cardData['card-issuing'].card_holder_id.substr(0, 6);
    this.formattedCardNumber2 = this.cardData['card-issuing'].card_holder_id.substr(6, 4) + ' ' +
      this.cardData['card-issuing'].card_holder_id.substr(10, 4) + ' ' +
      this.cardData['card-issuing'].card_holder_id.substr(14, 4) + ' ' +
      this.cardData['card-issuing'].card_holder_id.substr(18, 1);

  }

}
