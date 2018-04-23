import { Component, Input, ViewEncapsulation, OnChanges, OnInit } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as _ from 'lodash';

@Component({
  selector: 'app-certificate-status',
  templateUrl: './certificate-status.component.html',
  styleUrls: ['./certificate-status.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CertificateStatusComponent implements OnChanges, OnInit {
  status;
  @Input() validationPromises;
  @Input() cardType;

  constructor(private angulartics2: Angulartics2) { }

  ngOnInit() {
    // initialize the status
    this.status = 'checking';
  }

  ngOnChanges(changes) {
    // watch for changes in the validationPromises array
    if (changes.validationPromises && !_.isEmpty(this.validationPromises)) {
      this.angulartics2.eventTrack.next({
        action: 'cert-check',
        properties: { category: this.cardType, label: 'Start certificate check'}
      });
      // resolve all promises in the array
      Promise.all(this.validationPromises).then((res) => {
        // TODO remove
        console.log(res);
        // check all results for validity and qualification
        let qualified = true;
        let valid = true;
        _.forEach(res, validationRes => {
          if (!validationRes.qualifiedIssuer) {
            qualified = false;
          }
          if ((validationRes.crlResponse && !validationRes.crlResponse.status) ||
            (validationRes.ocspResponse && !validationRes.ocspResponse.status)) {
            valid = false;
          }
        });

        // determine overall result
        if (valid) {
          if (qualified) {
            this.status = 'qualified';
            this.angulartics2.eventTrack.next({
              action: 'cert-valid-qualified',
              properties: { category: this.cardType, label: 'Certificates are valid and qualified by EULOTL'}
            });
          } else {
            this.status = 'valid';
            this.angulartics2.eventTrack.next({
              action: 'cert-valid',
              properties: { category: this.cardType, label: 'Certificates are valid'}
            });
          }
        } else {
          this.status = 'invalid';
          this.angulartics2.eventTrack.next({
            action: 'cert-invalid',
            properties: { category: this.cardType, label: 'Certificates are not valid'}
          });
        }
      }, () => {
        this.angulartics2.eventTrack.next({
          action: 'cert-error',
          properties: { category: this.cardType, label: 'Error occured while checking certificate validity'}
        });
        this.status = 'error';
      });
    }
  }

}
