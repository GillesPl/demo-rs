import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-log-info',
  templateUrl: './log-info.component.html',
  styleUrls: ['./log-info.component.less']
})
export class LogInfoComponent implements OnInit {
  info;
  selectedTab = 0;

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.adminPanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshAdminData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {
    this.Connector.plugin('admin', 'getLogfileList').then(res => {
      this.info = _.reverse(res.data);
    }, () => {
      // could not retrieve logfile list, set empty
      this.info = [];
    });
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
