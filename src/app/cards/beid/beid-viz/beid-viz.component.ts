import {Component, Input, OnInit} from '@angular/core';
import {Connector} from '../../../connector.service';
import {EventService} from '../../../event.service';
import {CardService} from '../../card.service';
import {BeidService} from '../beid.service';
import {ModalService} from '../../modal.service';
import {Angulartics2} from 'angulartics2';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
  valid_phone = false;
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

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  validatePhone() {
    let headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
    })
    var re = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$');
    if (re.test(this.phonenr)) {
      document.querySelector(".phone-input").classList.remove("phone-invalid")
      this.valid_phone = false
      const otp = Math.floor(1000 + Math.random() * 9000);
      const dossiernr = 1;
      const stringrndata = JSON.stringify({
        rndata: this.rnData,
        addressData: this.addressData,
        picData: this.picData
      });
      let params = new HttpParams().set('gsm', this.phonenr.replace(' ', ''));
      this.http.get('/api/validate-getphone', {
        params: params,
        headers:headers
      }).subscribe(res => {
        if (res == null) {
          const data = {
            phone: this.phonenr.replace(' ', ''),
            data: stringrndata,
            otp: otp,
            dossiernr: dossiernr
          };
          this.http.post('/api/validate-phone', data, {
            headers: headers
          }).subscribe(res => {
            // generate otp and persist in db
            this.http.post('/api/sms', {
              gsmNr: this.phonenr,
              message: otp
            }, {
              headers: headers
            }).subscribe(smsres => {
              // @ts-ignore
              this.demoService.announceOtp(res.id);
            }, smserror => {
              console.log(smserror);
            });
          }, err => {
            console.log(err);
          });
        }
        else {
          // @ts-ignore
          this.http.put('/api/validate-phone', {otp: otp, id: res.id}, {headers:headers}).subscribe(response => {
            this.http.post('/api/sms', {
              gsmNr: this.phonenr,
              message: otp
            }, {headers: headers}).subscribe(smsres => {
              // @ts-ignore
              this.demoService.announceOtp(res.id);
            }, smserror => {
              console.log(smserror);
            });
          });
        }
      }, err => {
        console.log(err);
      });
    }
    else {
      // not a valid phone nr
      document.querySelector(".phone-input").classList.add("phone-invalid")
      this.valid_phone = true
    }

  }

}
