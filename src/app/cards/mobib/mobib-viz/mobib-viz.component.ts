import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MobibService } from '../mobib.service';

@Component({
  selector: 'app-mobib-viz',
  templateUrl: './mobib-viz.component.html',
  styleUrls: ['./mobib-viz.component.less']
})
export class MobibVizComponent implements OnInit {
  @Input() cardData;
  @Input() isBasic: boolean;
  @Input() readerId: string;
  cardStatus;
  mobibFrom;
  mobibTo;
  private validityDurations = { '0': 'minutes', '1': 'hours', '2': 'days', '3': 'months' };
  private dateFormat = 'DD.MM.YYYY';


  constructor(private Mobib: MobibService) { }

  ngOnInit() {
    console.log(this.cardData);
    if (this.cardData.active) { this.cardStatus = 'active'; } else { this.cardStatus = 'inactive'; }

    this.mobibFrom = moment(this.cardData['card-issuing'].card_holder_start_date, MobibService.cardDateFormat());
    this.mobibTo = moment(this.cardData['card-issuing'].card_expiration_date, MobibService.cardDateFormat());

    _.forEach(this.cardData.contracts, contract => {
      if (_.has(contract, 'operator_map')) {
        const validOperators = dec2bin(contract.operator_map);
        contract.validNMBS = (!_.isEmpty(validOperators[0]) && validOperators[0] === '1');
        contract.validMIVB = (!_.isEmpty(validOperators[1]) && validOperators[1] === '1');
        contract.validDeLijn = (!_.isEmpty(validOperators[2]) && validOperators[2] === '1');
        contract.validTEC = (!_.isEmpty(validOperators[3]) && validOperators[3] === '1');
      } else {
        contract.validNMBS = contract.provider === 1;
        contract.validMIVB = contract.provider === 2;
        contract.validMIVB = contract.provider === 2;
        contract.validDeLijn = contract.provider === 3;
        contract.validTEC = contract.provider === 4;
      }

      // Determine contract name
      contract.name = this.Mobib.getContractName(contract.type_id);

      // calculated by taking validitystart and adding the validity duration
      const startDate = moment(contract.validity_start_date, MobibService.cardDateFormat());
      if (contract.validity_duration && contract.validity_duration.value > 0) {
        const endDate = moment(contract.validity_start_date, MobibService.cardDateFormat());
        if (contract.validity_duration.unit === 0) {
          endDate.add(contract.validity_duration.value * 15, this.validityDurations[contract.validity_duration.unit]);
        } else {
          endDate.add(contract.validity_duration.value, this.validityDurations[contract.validity_duration.unit]);
        }
        contract.validityEnd = endDate.format(this.dateFormat);
      }

      contract.validityStart = startDate.format(this.dateFormat);

      if (_.has(contract, 'tariff.counter.type') && contract.tariff.counter.type !== 0) {
        // Determine further processing based on counter type
        switch (contract.tariff.counter.type) {
          case 0:
            break;
          case 1:
            // journeys remaining + last validation
            contract.countJourneys = true;
            contract.journeys = contract.tariff.counter.journeys;
            contract.lastValidation = moment(contract.tariff.counter.date, MobibService.cardDateFormat()).format(this.dateFormat);
            break;
          case 2:
            // journeys remaining
            contract.countJourneys = true;
            contract.journeys = contract.tariff.counter.journeys;
            break;
          case 3:
            // journeys remaining (reversed)
            contract.countJourneys = true;
            contract.journeys = contract.tariff.counter.journeys;
            break;
          case 4:
            // start time
            // todo figure out how to handle
            contract.validityStart = moment(contract.tariff.counter.time, MobibService.cardDateFormat()).format(this.dateFormat);
            break;
          case 5:
            // days remaining + last validation date
            contract.lastValidation = moment(contract.tariff.counter.date, MobibService.cardDateFormat()).format(this.dateFormat);
            // create copy of startdate
            const copy = { ...startDate };
            contract.validityEnd = copy.add(contract.tariff.counter.days, 'days').format(this.dateFormat);
            break;
          case 6:
            // start time + remaining journeys
            contract.countJourneys = true;
            contract.validityStart = moment(contract.tariff.counter.time, MobibService.cardDateFormat()).format(this.dateFormat);
            break;
          case 7:
            // start time + remaining days
            contract.validityStart = moment(contract.tariff.counter.time, MobibService.cardDateFormat()).format(this.dateFormat);
            contract.validityEnd = moment(contract.tariff.counter.time, MobibService.cardDateFormat())
              .add(contract.tariff.counter.days, 'days').format(this.dateFormat);
            break;
        }
      }

      // contract.active = moment() < endDate;
      if (contract.countJourneys) {
        contract.active = contract.journeys > 0;
      }
    });

    function dec2bin(n) {
      return _.reverse(n.toString(2).split(''));
    }
  }

  cardLang = () => {
    switch (this.cardData['card-issuing'].language) {
      case 0:
      case 1:
        return 'nl';
      case 2:
        return 'fr';
      case 3:
        return 'de';
      case 4:
        return 'en';
    }
  }

}
