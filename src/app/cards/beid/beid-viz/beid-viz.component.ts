import {Component, Input, OnInit} from '@angular/core';
import {Connector} from '../../../connector.service';
import {EventService} from '../../../event.service';
import {CardService} from '../../card.service';
import {BeidService} from '../beid.service';
import {ModalService} from '../../modal.service';
import {Angulartics2} from 'angulartics2';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DemoRsService} from '../../../card-visualizer/demo-rs.service';
import axios from 'axios';

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
  userMail:string;
  valid_phone = false;
  loadingCerts: boolean;
  isCollapsed = true;
  email_exists = false;

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

  sendTask(mail){
    //console.log(this.userMail)
    axios.post('/api/initcli').then((res)=>{
      var cookie=res.data.data;
      console.log(cookie)
      var uuid = '1c2888f7-a56f-47cc-b976-05da1fd26816';
      var data={
        cookie: cookie,
        uuid: uuid,
        //@ts-ignore
        email : this.userMail
      }
      axios.post('/api/sendTask',data).then((res)=>{
        if(res.data.success===true){
          // attach pdf
          console.log(res)
        } else{
          console.log(res)
          this.email_exists = true;
          setTimeout(() => {
            this.email_exists = false;
          }, 2000);
        }
      })
    })
  }


  validatePhone() {
    var re = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$');
    if (re.test(this.phonenr)) {
      document.querySelector('.phone-input').classList.remove('phone-invalid');
      this.valid_phone = false;
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
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        })
      }).subscribe(res => {
        if (res == null) {
          const data = {
            phone: this.phonenr.replace(' ', ''),
            data: stringrndata,
            otp: otp,
            dossiernr: dossiernr
          };
          this.http.post('/api/validate-phone', data, {
            headers: new HttpHeaders({
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            })
          }).subscribe(res => {
            // generate otp and persist in db
            this.http.post('/api/sms', {
              gsmNr: this.phonenr,
              message: otp
            }, {
              headers: new HttpHeaders({
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
              })
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
          this.http.put('/api/validate-phone', {otp: otp, id: res.id}, {
            headers: new HttpHeaders({
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            })
          }).subscribe(response => {
            this.http.post('/api/sms', {
              gsmNr: this.phonenr,
              message: otp
            }, {
              headers: new HttpHeaders({
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
              })
            }).subscribe(smsres => {
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
      document.querySelector('.phone-input').classList.add('phone-invalid');
      this.valid_phone = true;
    }

  }

}
