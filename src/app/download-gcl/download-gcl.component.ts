import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-download-gcl',
  templateUrl: './download-gcl.component.html',
  styleUrls: ['./download-gcl.component.less']
})
export class DownloadGclComponent implements OnInit {
  @Input() dlUrl: string;
  @Input() isFirefox: boolean;
  sendUpdates: boolean;
  waitingForInstall: boolean;
  modalRef: BsModalRef;
  userMail: string;

  constructor(private API: ApiService,
              private Connector: Connector,
              private eventService: EventService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.sendUpdates = false;
  }

  pollForGcl() {
    setTimeout(() => {
      this.Connector.getConnector().then(conn => {
        conn.core().info().then(() => {
          this.eventService.gclInstalled();
        }, () => {
          this.pollForGcl();
        });
      });
    }, 2500);
  }

  firefoxModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  registerDownload(mail) {
    this.waitingForInstall = true;
    if (!this.isFirefox) { this.pollForGcl(); }
    this.API.storeDownloadInfo(mail, this.sendUpdates, this.dlUrl);
  }
}
