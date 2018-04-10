import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rmc-header',
  templateUrl: './rmc-header.component.html',
  styleUrls: ['./rmc-header.component.less']
})
export class RmcHeaderComponent implements OnInit {
  @Output()
  startOver: EventEmitter<any> = new EventEmitter();
  @Output()
  openAdminPanel: EventEmitter<any> = new EventEmitter();
  @Output()
  openSidebar: EventEmitter<any> = new EventEmitter();

  adminOpen: boolean;
  menuOpen: boolean;

  constructor() { }

  ngOnInit() {}

  home() {
    this.startOver.emit(null);
  }

  toggleAdminPanel() {
    this.openAdminPanel.emit(null);
    this.adminOpen = !this.adminOpen;
  }

  toggleCardTypes() {
    this.openSidebar.emit(null);
    this.menuOpen = !this.menuOpen;
  }
}
