import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-list-entries',
  templateUrl: './list-entries.component.html',
  styleUrls: ['./list-entries.component.less']
})
export class ListEntriesComponent {

  listEntriesData: ListEntriesData = new ListEntriesData('','','' );
  listEntriesResponse: ListEntriesResponse;
  error: string;

  constructor(private conn: Connector, private eventService: EventService) {
  }

  listEntries() {
    if (this.listEntriesData.entity != '' && this.listEntriesData.type != '' && this.listEntriesData.keystore != '' ) {
      // keystore parameter must have .jks as an extension
      this.conn.get().javakeytool().ListEntries(this.listEntriesData).then(res => {
        console.log(res);
        this.listEntriesResponse = res;
      }, err => {
        this.error = err.description;
      });
    }
    this.listEntriesData = new ListEntriesData('','','' );
  }

}


export class ListEntriesData {
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

export class ListEntriesResponse {
  constructor(public data: StoreEntry[], public success: boolean) {
  }
}

export class StoreEntry {
  constructor(public alias: string, base64: string) {}
}
