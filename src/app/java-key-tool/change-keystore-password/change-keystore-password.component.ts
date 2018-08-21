import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-change-keystore-password',
  templateUrl: './change-keystore-password.component.html',
  styleUrls: ['./change-keystore-password.component.less']
})
export class ChangeKeystorePasswordComponent {

  changeKeyStorePassData: ChangeKeystorePasswordData = new ChangeKeystorePasswordData('','','');
  changeKeyStorePassResponse: ChangeKeystorePasswordResponse;
  error: string;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  changePassword() {
    this.reset();
    if (this.changeKeyStorePassData.entity != '' && this.changeKeyStorePassData.type != '' && this.changeKeyStorePassData.keystore != '') {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().ChangeKeystorePassword(this.changeKeyStorePassData).then(res => {
        this.changeKeyStorePassResponse = res;
      }, err => {
        this.error = err.description;
      });
      this.changeKeyStorePassData = new ChangeKeystorePasswordData('','','');
    }
  }

  reset() {
    this.error = null;
    this.changeKeyStorePassResponse = null;
  }

}


export class ChangeKeystorePasswordData {
  constructor(
    public entity: string,
    public type: string,
    public keystore: string,
    public newpass?: string,
    public storepass?: string,
    public storetype?: string,
    public providername?: string,
    public providerclass?: string,
    public providerarg?: string,
    public providerpath?: string
  ) {}
}

export class ChangeKeystorePasswordResponse {
  constructor(public data: boolean, public success: boolean) {
  }
}
