import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-change-alias',
  templateUrl: './change-alias.component.html',
  styleUrls: ['./change-alias.component.less']
})
export class ChangeAliasComponent {

  changeAliasData: ChangeAliasData = new ChangeAliasData('','','', '', '' );
  changeAliasResponse: ChangeAliasResponse;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  changeAlias() {
    if (this.changeAliasData.entity != '' && this.changeAliasData.type != '' && this.changeAliasData.keystore != '' && this.changeAliasData.alias != '' && this.changeAliasData.destalias != '') {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().ChangeAlias(this.changeAliasData).then(res => {
        this.changeAliasResponse = res;
      });
    }
  }

}
export class ChangeAliasData {
  constructor(
    public entity: string,
    public type: string,
    public keystore: string,
    public alias: string,
    public destalias: string,
    public keypass?: string,
    public storepass?: string,
    public storetype?: string,
    public providername?: string,
    public providerclass?: string,
    public providerarg?: string,
    public providerpath?: string
  ) {}
}

export class ChangeAliasResponse {
  constructor(public data: boolean, public success: boolean) {
  }
}
