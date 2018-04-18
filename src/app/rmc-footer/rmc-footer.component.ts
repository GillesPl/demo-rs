import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {EventService} from '../event.service';


@Component({
  selector: 'app-rmc-footer',
  templateUrl: './rmc-footer.component.html',
  styleUrls: ['./rmc-footer.component.less']
})
export class RmcFooterComponent implements OnInit {
  currentLocale: string;
  currentYear: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.currentLocale = localStorage.getItem('rmc-locale');
    this.currentYear = moment().format('YYYY');
  }

  toggleFAQ() {
    this.eventService.openFaq();
  }

  setLang(newLang) {
    localStorage.setItem('rmc-locale', newLang);
    location.reload(true);
  }

}
