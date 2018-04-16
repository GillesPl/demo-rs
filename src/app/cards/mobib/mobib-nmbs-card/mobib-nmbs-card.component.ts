import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { MobibService } from '../mobib.service';

@Component({
  selector: 'app-mobib-nmbs-card',
  templateUrl: './mobib-nmbs-card.component.html',
  styleUrls: ['./mobib-nmbs-card.component.less']
})
export class MobibNmbsCardComponent implements OnInit {
  @Input() cardData;
  @Input() lang;
  dob;
  validFrom;
  validUntil;
  firstName;
  lastName;
  logoUrl;

  constructor() { }

  ngOnInit() {
    if (this.lang === 'nl') {
      this.logoUrl = 'images/nmbs-mobility.jpg';
    }

    if (this.lang === 'fr') {
      this.logoUrl = 'images/sncb-mobility.jpg';
    }

    this.validFrom = moment(this.cardData['card-issuing'].card_holder_start_date, MobibService.cardDateFormat())
      .format(MobibService.displayDateFormat());
    this.validUntil = moment(this.cardData['card-issuing'].card_expiration_date, MobibService.cardDateFormat())
      .format(MobibService.displayDateFormat());
    this.dob = moment(this.cardData['card-issuing'].card_holder_birth_date, MobibService.cardDateFormat())
      .format(MobibService.displayDateFormat());

    const names = _.split(this.cardData['card-issuing'].card_holder_name, '|');
    this.firstName = _.trim(names[0].toLowerCase());
    this.lastName = _.trim(names[1]);
  }

}
