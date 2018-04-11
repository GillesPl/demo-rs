import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-card-reader-info',
  templateUrl: './card-reader-info.component.html',
  styleUrls: ['./card-reader-info.component.less']
})
export class CardReaderInfoComponent implements OnInit {
  readers;

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.adminPanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshAdminData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {
    this.Connector.getConnector().then(conn => {
      conn.core().readers().then(res => {
        this.readers = res.data;
      });
    });
  }

}
