import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { EventService } from '../../../event.service';
import { CardService } from '../../card.service';
import { BeidService } from '../beid.service';
import { ModalService } from '../../modal.service';
import { Angulartics2 } from 'angulartics2';
import {HttpClient} from '@angular/common/http';
import {DemoRsService} from '../../../card-visualizer/demo-rs.service';

@Component({
  selector: 'app-beid-viz',
  templateUrl: './beid-viz.component.html',
  styleUrls: ['./beid-viz.component.less']
})
export class BeidVizComponent implements OnInit {
  @Input() rnData;
  @Input() addressData;
  @Input() picData;
  @Input() readerId;
  @Input() certData;

  validationArray;
  pinStatus;
  phonenr;
  loadingCerts: boolean;
  isCollapsed = true;


  constructor(private angulartics2: Angulartics2,
              private beid: BeidService,
              private Connector: Connector,
              private eventService: EventService,
              private cardService: CardService,
              private modalService: ModalService,
              private http: HttpClient,
              private demoService: DemoRsService) {
  }

  ngOnInit() {
    const comp = this;
    this.pinStatus = 'idle';
  }


  validatePhone() {
    const stringrndata = JSON.stringify({
      rndata: this.rnData,
      addressData : this.addressData,
      picData : this.picData
    })
    const data = {
      phone: this.phonenr.replace(' ', ''),
      data: stringrndata
    };
    this.http.post("/api/validate-phone", data).subscribe(res => {
      // generate otp and persist in db
      this.http.post("/api/sms", {
        gsmNr: this.phonenr,
        message: Math.floor(1000 + Math.random() * 9000)
      }).subscribe(smsres => {
        console.log(res)
        this.demoService.announceOtp(res.id)
      }, smserror => {
        console.log(smserror)
      })
      //5e43b9ba-8925-4aef-a5dd-4d801713b285
    }, err => {
      console.log(err)
    })
  }

}
