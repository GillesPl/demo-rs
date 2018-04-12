import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../event.service';

@Component({
  selector: 'app-reader-polling',
  templateUrl: './reader-polling.component.html',
  styleUrls: ['./reader-polling.component.less']
})
export class ReaderPollingComponent implements OnInit {
  @Input() error: boolean;

  constructor(private eventService: EventService) { }

  ngOnInit() {}

  tryAgain() {
    this.eventService.retryReader();
  }

}
