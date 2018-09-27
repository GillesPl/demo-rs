import { Component, OnInit } from '@angular/core';
import { Connector } from '../connector.service';
import { environment } from '../../environments/environment';
import { BsModalRef } from 'ngx-bootstrap';
import { EventService } from '../event.service';

@Component({
  selector: 'app-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.less']
})
export class ConsentModalComponent implements OnInit {
  // Define pool of chars to use
  static readonly pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  file: boolean;
  code;

  private static generateCode() {
    let code = '';
    for (let i = 0; i < environment.consentCodeLength; i++) {
      code += this.pool.charAt(Math.floor(Math.random() * this.pool.length));

    }
    return code;
  }

  constructor(public bsRef: BsModalRef, private Connector: Connector, private eventService: EventService) { }

  ngOnInit() {

    // Generate random code
    this.code = ConsentModalComponent.generateCode();

    let title = 'Grant access to ' + location.origin + '?';
    let type = 'all';
    if (this.file) {
      title = 'Grant file access to ' + location.origin + '?';
      type = 'file_exchange';
    }

    this.Connector.get().core().getConsent(title,
      'Please confirm that ' + location.origin + ' is currently displaying the code ' + this.code,
      environment.consentDuration, 'warning', 'center', type, environment.consentTimeout).then(res => {
      this.eventService.consentResult(res);
      this.bsRef.hide();
    }, () => {
      // TODO inspect error and react accordingly
      this.eventService.consentResult({ data: false, success: true });
      this.bsRef.hide();
    });
  }






}
