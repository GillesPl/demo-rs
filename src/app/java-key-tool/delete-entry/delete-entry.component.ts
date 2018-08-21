import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.less']
})
export class DeleteEntryComponent {

  changeAliasData: DeleteEntryData = new DeleteEntryData('','','' );
  changeAliasResponse: DeleteEntryResponse;
  error: string;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  deleteEntry() {
    if (this.changeAliasData.entity != '' && this.changeAliasData.type != '' && this.changeAliasData.keystore != '' ) {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().DeleteEntry(this.changeAliasData).then(res => {
        this.changeAliasResponse = res;
      }, err => {
        this.error = err.description;
      });
      this.changeAliasData = new DeleteEntryData('','','' );
    }
  }

}
export class DeleteEntryData {
  constructor(
    public entity: string,
    public type: string,
    public keystore: string,
    public alias?: string,
    public storepass?: string,
    public storetype?: string,
    public providername?: string,
    public providerclass?: string,
    public providerarg?: string,
    public providerpath?: string
  ) {}
}

export class DeleteEntryResponse {
  constructor(public data: boolean, public success: boolean) {
  }
}
