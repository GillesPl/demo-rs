import { Component, OnInit } from '@angular/core';
import { Connector } from '../connector.service';
import { environment } from '../../environments/environment';
import { BsModalRef } from 'ngx-bootstrap';
import { EventService } from '../event.service';

@Component({
  selector: 'app-user-identification-shared-env',
  templateUrl: './user-identification-shared-env.component.html',
  styleUrls: ['./user-identification-shared-env.component.less']
})
export class UserIdentificationSharedEnvComponent implements OnInit {
  // Define pool of chars to use
  static readonly pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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
    this.code = UserIdentificationSharedEnvComponent.generateCode();

    this.Connector.get().agent().resolve(this.code).then(res => {
      this.eventService.userIdentificationResult(res);
      this.bsRef.hide();
    }, () => {
      // TODO inspect error and react accordingly
      this.eventService.userIdentificationResult({ data: {}, success: true });
      this.bsRef.hide();
    });
  }






}
