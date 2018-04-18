import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rmc-download-failed',
  templateUrl: './rmc-download-failed.component.html',
  styleUrls: ['./rmc-download-failed.component.less']
})
export class RmcDownloadFailedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  reload() {
    location.reload(true);
  }
}
