import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { EventService } from '../event.service';

@Component({
  selector: 'app-citrix-user-select-modal',
  templateUrl: './citrix-user-select-modal.component.html',
  styleUrls: ['./citrix-user-select-modal.component.less']
})
export class CitrixUserSelectModalComponent implements OnInit {
  retry;
  params;

  constructor(public bsModalRef: BsModalRef, private eventService: EventService) {}

  ngOnInit() {
    if (this.params && typeof this.params === 'object') {
      this.params = this.deconstructParams(this.params);
    }
    if (!this.params || _.isEmpty(this.params)) {
      this.params = this.useCurrentParams() || [ { key: 'username', value: '' }];
    }
  }

  ok() {
    const paramObject = {};
    _.forEach(this.params, p => {
      paramObject[p.key] = p.value;
    });
    this.eventService.citrixUserNameHandled(paramObject);
    this.bsModalRef.hide();
  }

  cancel() {
    this.eventService.citrixUserNameHandled(undefined);
    this.bsModalRef.hide();
  }

  addParam() {
    this.params.push({ key: '', value: ''});
  }

  insufficientParameters() {
    if (this.params.length) {
      let result = false;
      _.forEach(this.params, p => {
        if (!p.key.length || !p.value.length) { result = true; }
      });
      return result;
    } else { return true; }
  }

  removeParam(param) {
    _.remove(this.params, param);
  }

  useCurrentParams() {
    const params = JSON.parse(localStorage.getItem('rmc-citrix-selection-params'));
    return this.deconstructParams(params);
  }

  private deconstructParams(params) {
    if (params && !_.isEmpty(params)) {
      const deconstructed = [];
      _.forEach(params, (value, key) => {
        deconstructed.push({ key, value });
      });
      return deconstructed;
    } else { return undefined; }
  }

}
