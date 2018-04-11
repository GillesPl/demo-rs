import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-t1c-info',
  templateUrl: './t1c-info.component.html',
  styleUrls: ['./t1c-info.component.less']
})
export class T1cInfoComponent implements OnInit {
  info: any = {};

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.adminPanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshAdminData$.subscribe(() => this.getData());
  }

  ngOnInit() {}


  getData() {
    this.Connector.getConnector().then(conn => {
      conn.core().info().then(res => {
        this.info = res.data;
      });
    });
  }

}
