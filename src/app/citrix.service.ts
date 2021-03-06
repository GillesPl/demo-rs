import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Connector } from './connector.service';
import { CitrixUserSelectModalComponent } from './citrix-user-select-modal/citrix-user-select-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import { EventService } from './event.service';
import {UserIdentificationSharedEnvComponent} from './user-identification-shared-env/user-identification-shared-env.component';

@Injectable()
export class CitrixService {
  citrixAgent;
  citrixEnvironment = false;
  citrixPort = undefined;
  citrixUserSelectionParams = {};

  constructor(private Connector: Connector, private eventService: EventService, private modalService: BsModalService) {}

  agent(newAgent) {
    const svc = this;
    return new Promise((resolve) => {
      if (!_.isEmpty(newAgent)) {
        svc.citrixAgent = newAgent;
        svc.citrixPort = newAgent.port;
        svc.Connector.generateConfig(svc.citrixPort).then(cfg => {
          resolve(svc.Connector.init(cfg));
        });
      } else {
        resolve();
      }
    });
  }

  environment(isCitrix?) {
    if (_.isBoolean(isCitrix)) { this.citrixEnvironment = isCitrix; }
    return this.citrixEnvironment;
  }

  port() {
    return this.citrixPort;
  }

  userSelectionParams(params?) {
    if (params) { this.citrixUserSelectionParams = params; }
    return this.citrixUserSelectionParams;
  }

  invalidLocalAgent() {
    const svc = this;
    console.log('invalid local agent');
    return new Promise((resolve) => {
      svc.promptUsername(true).then(params => {
        if (params) {
          resolve(svc.userSelectionParams(params));
        } else {
          resolve(svc.invalidLocalAgent());
        }
      });
    });
  }

  checkUserName() {
    const svc = this;
    return new Promise((resolve, reject) => {
      const params = JSON.parse(localStorage.getItem('rmc-citrix-selection-params')); // $location.search();
      if (params && !_.isEmpty(params)) {
        resolve(svc.userSelectionParams(params));
      } else {
        // resolve agent using the implicit agent resolution flow: https://t1t.gitbook.io/t1c-js-belfius-guide/core/agents
        svc.initUserIdentificationFlow().then(inputParams => {
          if (inputParams) {
            resolve(svc.userSelectionParams(inputParams));
          } else {
            reject(svc.invalidLocalAgent());
          }
        });
      }
    });
  }

  initUserIdentificationFlow() {
    return new Promise((resolve) => {
      const initialState = {
        params: this.userSelectionParams()
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      this.modalService.show(UserIdentificationSharedEnvComponent, config); // CitrixUserSelectModalComponent
      this.eventService.citrixUserNameHandled$.subscribe((item) => {
        resolve(item);
      });
    });
  }

  // user name could be selected from a list before the initUserIdentificationFlow
  promptUsername(retry) {
    return new Promise((resolve) => {
      const initialState = {
        retry,
        params: this.userSelectionParams()
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      this.modalService.show(CitrixUserSelectModalComponent, config);
      this.eventService.citrixUserNameHandled$.subscribe((item) => {
        resolve(item);
      });
    });
  }

  updateLocation() {
    localStorage.setItem('rmc-citrix-selection-params', JSON.stringify(this.citrixUserSelectionParams));
  }
}
