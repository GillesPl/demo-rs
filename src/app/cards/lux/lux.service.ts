import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Connector } from '../../connector.service';
import { HttpClient } from '@angular/common/http';
import { CheckDigitService } from '../check-digit.service';
import { ApiService } from '../../api.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class LuxService {

  constructor(private API: ApiService, private CheckDigit: CheckDigitService, private Connector: Connector, private http: HttpClient) { }

  static pad(string) {
    return _.padEnd(_.truncate(string, { length: 30, omission: '' }), 30, '<');
  }

  static formatBirthDate(dob) {
    // assume 1900
    let prefix = '19';
    const dobYear = parseInt(dob.substr(0, 2), 10);

    if (dobYear < parseInt(moment().format('YY'), 10)) {
      // probably 2000
      prefix = '20';
    }
    return moment(prefix + dob, 'YYYYMMDD').format('DD.MM.YYYY');
  }

  static formatValidity(date) {
    return moment(date, 'YYMMDD').format('DD.MM.YYYY');
  }

  constructMachineReadableStrings(biometricData) {
    const mrs = [];
    // First line
    const prefix = biometricData.documentType;
    let first = biometricData.issuingState + biometricData.documentNumber;
    first += this.CheckDigit.calculate(first);
    first = LuxService.pad(prefix + first);
    mrs.push(first.toUpperCase());

    // Second line
    // TODO fix second line!
    let second = biometricData.birthDate;
    second += this.CheckDigit.calculate(second);
    second += biometricData.gender;
    second += biometricData.validityEndDate + this.CheckDigit.calculate(biometricData.validityEndDate);
    second += biometricData.nationality;
    second = LuxService.pad(second);
    mrs.push(second.toUpperCase());

    // Third line
    let third = _.join(_.split(biometricData.lastName, ' '), '<') + '<<';
    third += _.join(_.split(biometricData.firstName, ' '), '<');
    third = LuxService.pad(third);
    mrs.push(third.toUpperCase());
    return mrs;
  }


  generateXMLToSign(readerId) {
    return this.http.post('api/cards/lux/xmltosign', undefined).toPromise();
  }

  generateSummaryToSign(readerId, pin) {
    const service = this;
    return this.Connector.plugin('luxeid', 'allData', [readerId, pin]).then(results => {
      const conversions = [];
      conversions.push(service.API.convertJPEG2000toJPEG(results.data.picture.image));

      if (!_.isEmpty(results.data.signature_image) && !_.isEmpty(results.data.signature_image.image)) {
        conversions.push(service.API.convertJPEG2000toJPEG(results.data.signature_image.image));
      }

      return Promise.all(conversions).then(converted => {
        let data;
        if (converted.length === 2) {
          data = service.prepareSummaryData(results.data.biometric, converted[0].data.base64Pic, converted[1].data.base64Pic);
        } else {
          data = service.prepareSummaryData(results.data.biometric, converted[0].data.base64Pic, null);
        }
        return service.http.post('api/cards/lux/summarytosign', data).toPromise();
      }, error => {
        // TODO handle conversion failure
      });
    });
  }

  prepareSummaryData(biometric, picBase64, sigBase64) {
    const mrs = this.constructMachineReadableStrings(biometric);
    return {
      biometric: biometric,
      pic: picBase64,
      signature: sigBase64,
      formattedBirthDate: LuxService.formatBirthDate(biometric.birthDate),
      validFrom: LuxService.formatValidity(biometric.validityStartDate),
      validUntil: LuxService.formatValidity(biometric.validityEndDate),
      machineReadable1: mrs[0],
      machineReadable2: mrs[1],
      machineReadable3: mrs[2],
      printDate: moment().format('MMMM D, YYYY'),
      printedBy: environment.name + ' v' + environment.version
    };
  }
}
