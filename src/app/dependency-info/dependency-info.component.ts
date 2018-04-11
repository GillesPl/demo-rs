import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-dependency-info',
  templateUrl: './dependency-info.component.html',
  styleUrls: ['./dependency-info.component.less']
})
export class DependencyInfoComponent implements OnInit {
  info: { js?, gcl?, ocv?, ds?, signbox? } = {};

  constructor(private API: ApiService, private Connector: Connector, private eventService: EventService) {
    this.eventService.adminPanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshAdminData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {
    this.Connector.getConnector().then(conn => {
      conn.core().version().then(res => {
        this.info.js = res;
      });

      conn.core().info().then(res => {
        this.info.gcl = res.data;
      });

      conn.ocv().getInfo().then(res => {
        this.info.ocv = res;
      });

      conn.ds().getInfo().then(res => {
        this.info.ds = res;
      });
    });

    this.API.signboxVersion().subscribe(res => {
      this.info.signbox = res;
    });
  }
}
