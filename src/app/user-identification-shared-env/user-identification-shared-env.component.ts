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
  }

  ok() {
    console.log('I want to access do your magic: ' + this.code);
    this.Connector.get().agent().resolve(this.code).then(res => {
      console.log('Agent found: ' + res.data.username);
      this.eventService.citrixUserNameHandled(res.data.username);
      this.bsRef.hide();
    }, (err) => {
      console.log('Agent not found: ' + err.message);
      // TODO inspect error and react accordingly
      // this.eventService.citrixUserNameHandled(undefined);
      // this.bsRef.hide();
    });
    // copy to clipboard should have been done - this method resolves the after click
    // request agent resolve
    // sent event with response

  }






}
