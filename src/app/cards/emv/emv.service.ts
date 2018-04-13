import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class EmvService {

  constructor() { }

  constructCardNumber(original) {
    let cardNumber = '';
    _.forEach(original, (comp, idx) => {
      idx % 4 === 0 ? cardNumber += ' ' + comp : cardNumber += comp;
    });
    return cardNumber;
  }

  constructExpirationDate(original) {
    return moment(original, 'YYMMDD').format('MM/YY');
  }
}
