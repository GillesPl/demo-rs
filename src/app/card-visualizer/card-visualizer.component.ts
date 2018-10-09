import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventService} from '../event.service';
import {ApiService} from '../api.service';
import {Connector} from '../connector.service';
import {CardService} from '../cards/card.service';
import {RMC} from '../rmc.service';
import * as _ from 'lodash';
import {DemoRsService} from './demo-rs.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BeidService} from '../cards/beid/beid.service';

@Component({
  selector: 'app-card-visualizer',
  templateUrl: './card-visualizer.component.html',
  styleUrls: ['./card-visualizer.component.less']
})
export class CardVisualizerComponent implements OnChanges, OnInit {
  @Input() readerId;
  currentReaderId;
  loading: boolean;
  errorReadingCard: boolean;
  unknownCard: boolean;
  submitted: boolean;
  card;
  cardData;
  cardType: string;
  cardTypePretty: string;
  cardDesc: string;
  registerPhone
  cardinfoGarage;
  gsmnr;
  validatecomplete
  validateGsm
  validateotp
  validategsmComplete
  validateotpComplete
  showeid
  prereg
  showdossierdata
  id;
  phonenmr;

  formattedCardNumber;
  formattedRRNR;
  machineReadable1;
  machineReadable2;
  machineReadable3;


  constructor(private API: ApiService, private cardService: CardService,
              private Connector: Connector, private eventService: EventService, private RMC: RMC, private demoService: DemoRsService, private http: HttpClient, private beidService: BeidService) {
    demoService.otpAnnounced$.subscribe(
      id => {
        this.prereg = false;
        this.registerPhone = true;
        this.id = id
      });
    this.eventService.reinitialize$.subscribe(() => {
      // re-execute init when reinitialize event is received
      this.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.readerId && changes.readerId.currentValue !== this.currentReaderId) {
      if (this.currentReaderId) {
        // if set, the Reader ID has changed, we need to reinitialize the view
        this.ngOnInit();
        // if not set this is the first init and ngOnInit is called anyway
      }
      // store new ID for future checks
      this.currentReaderId = changes.readerId.currentValue;
    }
  }

  ngOnInit() {
    const component = this;

    this.showdossierdata = false;
    this.validateotpComplete = false;
    this.validategsmComplete = false;
    this.prereg = true;
    this.registerPhone = false;
    this.validatecomplete = false;
    this.validateGsm = false;
    this.validateotp = false;
    this.showeid= false;

    this.loading = true;
    this.errorReadingCard = false;
    this.unknownCard = false;
    // Detect Type and read data
    component.Connector.core('reader', [component.readerId]).then(readerInfo => {
      component.cardService.detectContainer(readerInfo.data.id).then(type => {
        component.cardType = type;
        component.cardTypePretty = component.cardService.getCardTypeName(type, readerInfo.data.card);
        component.card = readerInfo.data.card;

        if (component.cardType === 'unknown') {
          component.unknownCard = true;
          component.loading = false;
          component.RMC.monitorCardRemoval(component.readerId, component.card);
        } else if (_.includes(['luxeid', 'piv'], type)) {
          // Special handling for luxeid and PIV
          setTimeout(() => {
            component.loading = false;
          });
          component.RMC.monitorCardRemoval(component.readerId, component.card);
        } else {
          // Other cards use generic dumpData method
          component.Connector.generic('dumpData', [readerInfo.data.id]).then(res => {
            component.cardData = res.data;
            console.log(component.cardData)
            component.loading = false;
            component.RMC.monitorCardRemoval(component.readerId, component.card);
          }, function (error) {
            console.log(error);
            if (error.status === 412 && (error.data.code === 900 || error.data.code === 0)) {
              // this usually means the card was removed during reading, check if it is still present
              component.RMC.checkCardRemoval(component.readerId, component.card).then(function (removed) {
                if (removed) {
                  component.eventService.startOver();
                }
                component.ngOnInit();
              });
            } else {
              component.errorReadingCard = true;
              component.loading = false;
              component.RMC.monitorCardRemoval(component.readerId, component.card);
            }
          });
        }
      }).catch(err => {
        console.log(err);
        component.unknownCard = true;
        component.loading = false;
        component.RMC.monitorCardRemoval(component.readerId, readerInfo.data.card);
      });
    }, function (error) {
      if (error.message === 'Network Error') {
        // try again after short delay
        setTimeout(function () {
          component.ngOnInit();
        }, 100);
      } else {
        // fire event to restart
        component.eventService.startOver();
      }
    });

  }

  readAnother() {
    this.eventService.startOver(this.readerId);
  }

  registerUnknownType(cardDescription) {
    this.submitted = true;
    this.API.storeUnknownCardInfo(this.card, cardDescription);
  }

  showSupportedCardTypes() {
    this.eventService.openSidebar();
  }

  confirmOtp() {
    let params = new HttpParams().set("id",this.id);
    this.http.get('/api/validate-phone', {
      params: params
    }).subscribe(res => {
      this.validatecomplete = true;
      this.gsmnr = res.phonenumber;
      this.cardinfoGarage =JSON.parse(res.rndata);
      setTimeout(() => {
        this.registerPhone = false;
        this.validateGsm = true;
      }, 5000)
    }, err => {
      console.log(err);
    });
  }

  valideatephone() {
    setTimeout(() => {
      this.validategsmComplete = true;
      setTimeout(() => {
        console.log(this.phonenmr)
        this.http.post("/api/sms", {
          gsmNr: this.phonenmr,
          message: Math.floor(1000 + Math.random() * 9000)
        }).subscribe(phonres => {
          this.validateGsm = false;
          this.validateotp = true
        })
      }, 2000)
    }, 500)
  }

  valideateotp() {
    setTimeout(() => {
      this.validateotpComplete = true;
      setTimeout(() => {
        this.validateotp = false;
        this.showeid = true
      }, 2000)
    }, 500)
  }

  dossierdata() {
    console.log(this.cardData)
    this.formattedCardNumber = BeidService.formatCardNumber(this.cardData.rn.card_number);
    this.formattedRRNR = BeidService.formatRRNR(this.cardData.rn.national_number);

    const mrs = this.beidService.constructMachineReadableStrings(this.cardData.rn);

    this.machineReadable1 = mrs[0];
    this.machineReadable2 = mrs[1];
    this.machineReadable3 = mrs[2];

    this.showdossierdata = true
  }
}
