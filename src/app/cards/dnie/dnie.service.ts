import { Injectable } from '@angular/core';
import { Connector } from '../../connector.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CheckDigitService } from '../check-digit.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DnieService {

  constructor(private CheckDigit: CheckDigitService, private Connector: Connector, private http: HttpClient) { }

  static formatCardNumber(card) {
    return card.substr(0, 3) + '-' + card.substr(3, 7) + '-' + card.substr(10, 2);
  }

  static formatRRNR(rrnrString) {
    return rrnrString.substr(0, 2) + '.' + rrnrString.substr(2, 2) + '.' +
      rrnrString.substr(4, 2) + '-' + rrnrString.substr(6, 3) + '.' + rrnrString.substr(9, 2);
  }

  static pad(string) {
    return _.padEnd(_.truncate(string, { length: 30, omission: '' }), 30, '<');
  }

  generateSummaryToSign(readerId) {
    const service = this;
    const promises = [
      this.Connector.plugin('dnie', 'rnData', [readerId]),
      this.Connector.plugin('dnie', 'address', [readerId]),
      this.Connector.plugin('dnie', 'picture', [readerId])
    ];

    return Promise.all(promises).then(function (results) {
      const data = service.prepareSummaryData(results[0].data, results[1].data, results[2].data);
      return service.http.post('api/cards/be/summarytosign', data).toPromise().then(function (res: any) {
        return res.data;
      });
    });
  }

  downloadDocument(documentName) {
    return this.http.post('api/cards/be/download', { documentName: documentName }, { responseType: 'arraybuffer' }).toPromise();
  }

  prepareSummaryData(rnData, addressData, picData) {
    const mrs = this.constructMachineReadableStrings(rnData);
    return {
      rnData: rnData,
      address: addressData,
      pic: picData,
      dob: moment('' + _.join(_.takeRight(rnData.birth_date, 4), '') +
        rnData.national_number.substr(2, 4), 'YYYYMMDD').format('MMMM D, YYYY'),
      formattedCardNumber: DnieService.formatCardNumber(rnData.card_number),
      formattedRRNR: DnieService.formatRRNR(rnData.national_number),
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
    let first = 'ESP' + rnData.idesp;
    first += this.CheckDigit.calculate(rnData.idesp);
    first += rnData.number;
    first = DnieService.pad(prefix + first);
    mrs.push(first.toUpperCase());

    // Second line
    let second = '000000000000000ESP';
    second += this.CheckDigit.calculate(second);
    second = DnieService.pad(second);
    mrs.push(second.toUpperCase());

    // Third line
    let third = rnData.firstLastName + '<' + rnData.secondLastName + '<<' + rnData.firstName.replace(' ', '<');
    third = DnieService.pad(third);
    mrs.push(third.toUpperCase());
    return mrs;
  }
}
