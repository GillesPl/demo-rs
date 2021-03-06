import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';

@Component({
  selector: 'app-rmc-header',
  templateUrl: './rmc-header.component.html',
  styleUrls: ['./rmc-header.component.less']
})
export class RmcHeaderComponent implements OnInit {
  adminOpen = false;
  fileExchangeOpen = false;
  javakeytoolOpen = false;
  menuOpen = false;

  constructor(private eventService: EventService) {
    this.eventService.adminPanelClosed$.subscribe(() => this.onAdminPanelClose());
    this.eventService.adminPanelOpened$.subscribe(() => this.onAdminPanelOpen());
    this.eventService.fileExchangePanelClosed$.subscribe(() => this.onFileExchangePanelClose());
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.onFileExchangePanelOpen());
    this.eventService.javaKeyToolClosed$.subscribe(() => this.onJavaKeyToolPanelClose());
    this.eventService.javaKeyToolOpened$.subscribe(() => this.onJavaKeyToolPanelOpen());
    this.eventService.sidebarClosed$.subscribe(() => this.onSidebarClose());
    this.eventService.sidebarOpened$.subscribe(() => this.onSidebarOpen());
  }

  ngOnInit() {}

  home() {
    this.eventService.startOver();
  }

  toggleAdminPanel() {
    this.eventService.openAdminPanel();
  }

  toggleFileExchangePanel() {
    this.eventService.openFileExchangePanel();
  }

  toggleJavaKeyToolPanel() {
    this.eventService.openJavaKeyToolPanel()
  }

  toggleCardTypes() {
    this.eventService.openSidebar();
  }

  // Event handlers
  onAdminPanelClose() {
    this.adminOpen = false;
  }

  onAdminPanelOpen() {
    this.adminOpen = !this.adminOpen;
  }

  onFileExchangePanelClose() {
    this.fileExchangeOpen = false;
  }

  onFileExchangePanelOpen() {
    this.fileExchangeOpen = !this.fileExchangeOpen;
  }

  onJavaKeyToolPanelOpen() {
    this.javakeytoolOpen = !this.javakeytoolOpen;
  }

  onJavaKeyToolPanelClose() {
    this.javakeytoolOpen = false;
  }

  onSidebarClose() {
    this.menuOpen = false;
  }

  onSidebarOpen() {
    this.menuOpen = !this.menuOpen;
  }
}
