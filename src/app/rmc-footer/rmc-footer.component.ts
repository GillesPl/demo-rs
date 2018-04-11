import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {EventService} from '../event.service';


@Component({
  selector: 'app-rmc-footer',
  templateUrl: './rmc-footer.component.html',
  styleUrls: ['./rmc-footer.component.less']
})
export class RmcFooterComponent implements OnInit {
  currentYear: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.currentYear = moment().format('YYYY');
  }

  toggleFAQ() {
    this.eventService.openFaq();
  }

}
