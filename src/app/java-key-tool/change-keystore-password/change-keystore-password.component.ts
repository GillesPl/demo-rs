import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-change-keystore-password',
  templateUrl: './change-keystore-password.component.html',
  styleUrls: ['./change-keystore-password.component.less']
})
export class ChangeKeystorePasswordComponent {

  changeKeyPassData: ChangeKeystorePasswordData = new ChangeKeystorePasswordData('','','', '' );
  changeKeyPassResponse: ChangeKeystorePasswordResponse;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  changePassword() {
    if (this.changeKeyPassData.entity != '' && this.changeKeyPassData.type != '' && this.changeKeyPassData.keystore != '') {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().ChangeKeystorePassword(this.changeKeyPassData).then(res => {
        this.changeKeyPassResponse = res;
      });
    }
  }

}


export class ChangeKeystorePasswordData {
  constructor(
    public entity: string,
    public type: string,
    public keystore: string,
    public new_password?: string,
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
