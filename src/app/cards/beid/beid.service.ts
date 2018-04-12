import { Injectable } from '@angular/core';
import { Connector } from '../../connector.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CheckDigitService } from '../check-digit.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BeidService {

  constructor(private checkDigit: CheckDigitService, private Connector: Connector, private http: HttpClient) { }

  static pad(string) {
    return _.padEnd(_.truncate(string, { length: 30, omission: '' }), 30, '<');
  }

  static formatCardNumber(card) {
    return card.substr(0, 3) + '-' + card.substr(3, 7) + '-' + card.substr(10, 2);
  }

  static formatRRNR(rrnrString) {
    return rrnrString.substr(0, 2) + '.' + rrnrString.substr(2, 2) + '.' +
      rrnrString.substr(4, 2) + '-' + rrnrString.substr(6, 3) + '.' + rrnrString.substr(9, 2);
  }

  generateSummaryToSign(readerId) {
    const service = this;

    const promises = [
      this.Connector.plugin('beid', 'rnData', [readerId]),
      this.Connector.plugin('beid', 'address', [readerId]),
      this.Connector.plugin('beid', 'picture', [readerId])
    ];

    return Promise.all(promises).then(function (results) {
      const data = service.prepareSummaryData(results[0].data, results[1].data, results[2].data);
      return service.http.post('api/cards/be/summarytosign', data).toPromise().then(function (res: any) {
        return res.data;
      });
    });
  }

  prepareSummaryData(rnData, addressData, picData) {
    const mrs = this.constructMachineReadableStrings(rnData);
    return {
      rnData: rnData,
      address: addressData,
      pic: picData,
      dob: moment('' + _.join(_.takeRight(rnData.birth_date, 4), '') +
        rnData.national_number.substr(2, 4), 'YYYYMMDD').format('MMMM D, YYYY'),
      formattedCardNumber: BeidService.formatCardNumber(rnData.card_number),
      formattedRRNR: BeidService.formatRRNR(rnData.national_number),
      machineReadable1: mrs[0],
      machineReadable2: mrs[1],
      machineReadable3: mrs[2],
      validFrom: moment(rnData.card_validity_date_begin, 'DD.MM.YYYY').format('MMMM D, YYYY'),
      validUntil: moment(rnData.card_validity_date_end, 'DD.MM.YYYY').format('MMMM D, YYYY'),
      printDate: moment().format('MMMM D, YYYY'),
      printedBy: '@@name v@@version'
    };
  }

  constructMachineReadableStrings(rnData) {
    const mrs = [];
    // First line
    const prefix = 'ID';
    let first = 'BEL' + rnData.card_number.substr(0, 9) + '<' + rnData.card_number.substr(9);
    first += this.checkDigit.calculate(first);
    first = BeidService.pad(prefix + first);
    mrs.push(first.toUpperCase());

    // Second line
    let second = rnData.national_number.substr(0, 6);
    second += this.checkDigit.calculate(second);
    second += rnData.sex;
    const validity = rnData.card_validity_date_end.substr(8, 2) +
      rnData.card_validity_date_end.substr(3, 2) + rnData.card_validity_date_end.substr(0, 2);
    second += validity + this.checkDigit.calculate(validity);
    second += rnData.nationality.substr(0, 3);
    second += rnData.national_number;
    const finalCheck = rnData.card_number.substr(0, 10) + rnData.national_number.substr(0, 6) + validity + rnData.national_number;
    second += this.checkDigit.calculate(finalCheck);
    second = BeidService.pad(second);
    mrs.push(second.toUpperCase());

    // Third line
    let third = _.join(_.split(rnData.name, ' '), '<') + '<<' +
      _.join(_.split(rnData.first_names, ' '), '<') + '<' + _.join(_.split(rnData.third_name, ' '), '<');
    third = BeidService.pad(third);
    mrs.push(third.toUpperCase());
    return mrs;
  }
}


