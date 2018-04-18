import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../event.service';

@Component({
  selector: 'app-reader-icon',
  templateUrl: './reader-icon.component.html',
  styleUrls: ['./reader-icon.component.less']
})
export class ReaderIconComponent implements OnInit {
  @Input() currentReaderId;
  @Input() index;
  @Input() reader;

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  selectReader() {
    this.eventService.selectReader(this.reader);
  }
}
