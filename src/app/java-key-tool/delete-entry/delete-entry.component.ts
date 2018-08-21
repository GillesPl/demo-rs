import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.less']
})
export class DeleteEntryComponent {

  changeDeleteEntryData: DeleteEntryData = new DeleteEntryData('','','' );
  changeDeleteEntryResponse: DeleteEntryResponse;
  error: string;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  deleteEntry() {
    this.reset();
    if (this.changeDeleteEntryData.entity != '' && this.changeDeleteEntryData.type != '' && this.changeDeleteEntryData.keystore != '' ) {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().DeleteEntry(this.changeDeleteEntryData).then(res => {
        this.changeDeleteEntryResponse = res;
      }, err => {
        this.error = err.description;
      });
      this.changeDeleteEntryData = new DeleteEntryData('','','' );
    }
  }

  reset() {
    this.error = null;
    this.changeDeleteEntryResponse = null;
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
