import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-file-exchange-misc',
  templateUrl: './file-exchange-misc.component.html',
  styleUrls: ['./file-exchange-misc.component.less']
})
export class FileExchangeMiscComponent implements OnInit {

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {}

  showInfo(title, text, timeout) {
    this.Connector.plugin('filex', 'showModal', [],
      [title.value, text.value, 'info', parseInt(timeout.value, 10)]).then(res => {
        console.log('showing info modal from operating system, returned: ' + res.data);
    });
  }

  showChoice(title, text, timeout) {
    this.Connector.plugin('filex', 'showModal', [],
      [title.value, text.value, 'choice', parseInt(timeout.value, 10)]).then(res => {
      console.log('showing info modal from operating system, returned: ' + res.data);
    });
  }
}
