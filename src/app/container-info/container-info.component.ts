import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-container-info',
  templateUrl: './container-info.component.html',
  styleUrls: ['./container-info.component.less']
})
export class ContainerInfoComponent implements OnInit {
  containers;

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.adminPanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshAdminData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {
    this.Connector.getConnector().then(conn => {
      conn.core().info().then(res => {
        this.containers = res.data.containers;
      });
    });
  }
}
