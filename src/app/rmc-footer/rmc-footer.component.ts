import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-rmc-footer',
  templateUrl: './rmc-footer.component.html',
  styleUrls: ['./rmc-footer.component.less']
})
export class RmcFooterComponent implements OnInit {
  currentYear: string;

  constructor() { }

  ngOnInit() {
    this.currentYear = moment().format('YYYY');
  }

}
