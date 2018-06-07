import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-file-exchange-fileops',
  templateUrl: './file-exchange-fileops.component.html',
  styleUrls: ['./file-exchange-fileops.component.less']
})
export class FileExchangeFileopsComponent implements OnInit {
  info: { uid?: string, activated?: boolean } = {};

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {}
}
