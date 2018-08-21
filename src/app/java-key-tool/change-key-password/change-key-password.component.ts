import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-change-key-password',
  templateUrl: './change-key-password.component.html',
  styleUrls: ['./change-key-password.component.less']
})
export class ChangeKeyPasswordComponent {

  changeKeyPassData: ChangeKeyPasswordData = new ChangeKeyPasswordData('','','', '' );
  changeKeyPassResponse: ChangeKeyPasswordResponse;
  error: string;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  changeKeyPass() {
    if (this.changeKeyPassData.entity != '' && this.changeKeyPassData.type != '' && this.changeKeyPassData.keystore != '' && this.changeKeyPassData.alias != '') {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().ChangeKeyPassword(this.changeKeyPassData).then(res => {
        this.changeKeyPassResponse = res;
      }, err => {
        this.error = err.description;
      });
      this.changeKeyPassData = new ChangeKeyPasswordData('','','', '' );
    }
  }

}

export class ChangeKeyPasswordData {
  constructor(
    public entity: string,
    public type: string,
    public keystore: string,
    public alias: string,
    public new_password?: string,
    public keypass?: string,
    public storepass?: string,
    public storetype?: string,
    public providername?: string,
    public providerclass?: string,
    public providerarg?: string,
    public providerpath?: string
  ) {}
}

export class ChangeKeyPasswordResponse {
  constructor(public data: boolean, public success: boolean) {
  }
}
