import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-file-exchange',
  templateUrl: './fileexchange.component.html',
  styleUrls: ['./fileexchange.component.less']
})
export class FileexchangeComponent implements OnInit {
  info: { uid?: string, activated?: boolean } = {};

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {
    this.Connector.core('info').then(res => {
      this.info = res.data;
    });
  }
}
