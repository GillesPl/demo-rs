import { Component, OnInit } from '@angular/core';
import {Connector} from '../../connector.service';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-file-exchange-types',
  templateUrl: './file-exchange-types.component.html',
  styleUrls: ['./file-exchange-types.component.less']
})
export class FileExchangeTypesComponent implements OnInit {

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {
    this.Connector.plugin('filex', 'createType', [], ['mpc', 'coda']).then(res => {
      console.log('filex res:' + res.data); }, err => { console.log(err); });
  }
}
