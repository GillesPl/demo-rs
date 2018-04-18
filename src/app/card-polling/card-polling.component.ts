import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../event.service';

@Component({
  selector: 'app-card-polling',
  templateUrl: './card-polling.component.html',
  styleUrls: ['./card-polling.component.less']
})
export class CardPollingComponent implements OnInit {
  @Input() error: boolean;
  @Input() pollTimeout: boolean;

  constructor(private eventService: EventService) { }

  ngOnInit() {}

  openSidebar() {
    this.eventService.openSidebar();
  }

  tryAgain() {
    this.eventService.retryCard();
  }

}
