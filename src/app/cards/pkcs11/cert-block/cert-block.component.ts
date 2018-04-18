import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-cert-block',
  templateUrl: './cert-block.component.html',
  styleUrls: ['./cert-block.component.less']
})
export class CertBlockComponent implements OnInit {
  @Input() cert;
  subject;
  issuer;
  notBefore;
  notAfter;

  constructor() { }

  ngOnInit() {
    const controller = this;
    controller.subject = controller.determineSubject(controller.cert.parsed);
    controller.issuer = controller.determineIssuer(controller.cert.parsed);
    controller.notBefore = moment(controller.cert.parsed.notBefore.value).format('MMMM Do YYYY, HH:mm:ss');
    controller.notAfter = moment(controller.cert.parsed.notAfter.value).format('MMMM Do YYYY, HH:mm:ss');
  }

  determineIssuer(parsedCert) {
    return this.parsedCertValueBuilder(parsedCert, 'issuer');
  }

  determineSubject(parsedCert) {
    return this.parsedCertValueBuilder(parsedCert, 'subject');
  }

  parsedCertValueBuilder(parsed, key) {
    let val = '';
    _.forEach(parsed[key].typesAndValues, tv => {
      val += tv.value.valueBlock.value + ' ';
    });
    return _.trimEnd(val);
  }
}
