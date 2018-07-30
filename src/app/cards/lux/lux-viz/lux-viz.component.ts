import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { ApiService } from '../../../api.service';
import * as _ from 'lodash';
import { LuxService } from '../lux.service';
import { ModalService } from '../../modal.service';
import {EventService} from '../../../event.service';
import {CardService} from '../../card.service';

@Component({
  selector: 'app-lux-viz',
  templateUrl: './lux-viz.component.html',
  styleUrls: ['./lux-viz.component.less']
})
export class LuxVizComponent implements OnInit {
  @Input() readerId;

  usePin: boolean;
  pinType: string;

  certData;
  pinpad: boolean;
  needPin: boolean = true;
  readingData: boolean = false;
  code: string;
  pincode;
  pinStatus;
  validationArray;
  biometricData;
  signatureObject;
  picData;
  pic;
  signature;

  error: string;

  pinCounterUser: number;
  pinCounterAdmin: number; //PUK counter

  authCert;
  nonRepCert;
  rootCerts;
  loadingCerts;


  constructor(private API: ApiService, private Connector: Connector,
              private lux: LuxService, private modalService: ModalService,
              private eventService: EventService, private cardService: CardService,) {
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results))
  }

  ngOnInit() {
    this.usePin = true;
    this.pinStatus = 'idle';
    const comp = this;
    // check type of reader
    comp.Connector.core('reader', [comp.readerId]).then(res => {
      this.pinpad = res.data.pinpad;
      if (!this.pinpad) {
        comp.pincode = { value: '' };
      } else {
        // launch data request
        comp.getAllData()
      }
    });
  }

  checkPin() {
    this.modalService.openPinWithCanModalForReader(this.readerId,this.code, this.pinType);
  }

  handlePinCheckResult(pinCheck) {
    this.pinStatus = this.cardService.determinePinModalResult(pinCheck, 'luxeid');
  }

  resetPin() {
    this.modalService.openResetPinModalForReader(this.readerId, 'Reset pin', this.code, this.pinType);
  }

  unblockPin() {
    this.modalService.openUnblockPinModalForReader(this.readerId, 'Unblock pin' , this.code, this.pinType);
  }

  changePin() {
    this.modalService.openChangePinModalForReader(this.readerId, 'Change pin',this.code, this.pinType);
  }

  submitPin(pinCode) {
    this.readingData = true;
    this.needPin = false;
    this.code = pinCode;

    this.getAllData();
  }

  downloadSummary() {
    if (this.pic || this.signature) {
      this.modalService.openSummaryPaceModalForReader(this.readerId, true, this.lux, this.code, this.pic, this.signature);
    }
  }

  toggleCerts() {
    this.certData = !this.certData;
  }

  refreshPinTryCounter() {
    this.pinCounterAdmin = null;
    this.pinCounterUser = null;
    this.getPinTryCounter();
  }

  getPinTryCounter() {
    this.Connector.plugin('luxeid', 'pinTryCounter',[this.readerId, this.code, this.pinType],[{"pin_reference" : 'user'}]).then(res => {
      this.error = null;
      this.pinCounterUser = res.data;
    }, error => {
      this.setError(error.description)
    })
    this.Connector.plugin('luxeid', 'pinTryCounter',[this.readerId, this.code, this.pinType],[{"pin_reference" : 'admin'}]).then(res => {
      this.error = null;
      this.pinCounterAdmin = res.data;
    }, error => {
      this.setError(error.description)
    })
  }

  getAllData() {
    const comp = this;
    comp.Connector.plugin('luxeid', 'allData', [comp.readerId, comp.code, this.pinType]).then(res => {
      this.readingData = false;
      this.error = null;
      this.getPinTryCounter();

      comp.biometricData = res.data.biometric;
      comp.signatureObject = res.data.signature_object;
      comp.picData = res.data.picture;

      const conversions = [];

      conversions.push(comp.API.convertJPEG2000toJPEG(comp.picData.image));

      if (!_.isEmpty(res.data.signature_image) && !_.isEmpty(res.data.signature_image.image)) {
        conversions.push(comp.API.convertJPEG2000toJPEG(res.data.signature_image.image));
      }

      Promise.all(conversions).then(converted => {
        converted[0].subscribe(data => {
          comp.pic = data.base64Pic
        });
        if (!_.isEmpty(converted[1])) {
          converted[1].subscribe(data => {
            comp.signature = data.base64Pic
          });
        }
      }, err => {
        console.error(err)
      });

      comp.authCert = res.data.authentication_certificate.base64;
      comp.nonRepCert = res.data.non_repudiation_certificate.base64;
      comp.rootCerts = _.map(res.data.root_certificates, 'base64');

      comp.readingData = false;

      const validationReq1 = {
        certificateChain: [
          { order: 0, certificate: res.data.authentication_certificate.base64 },
          { order: 1, certificate: res.data.root_certificates[1].base64 },
          { order: 2, certificate: res.data.root_certificates[0].base64 },
        ]
      };
      const validationReq2 = {
        certificateChain: [
          { order: 0, certificate: res.data.non_repudiation_certificate.base64 },
          { order: 1, certificate: res.data.root_certificates[1].base64 },
          { order: 2, certificate: res.data.root_certificates[0].base64 },
        ]
      };
      comp.validationArray = [ comp.Connector.ocv('validateCertificateChain', [validationReq1]),
        comp.Connector.ocv('validateCertificateChain', [validationReq2]) ];
    }, err => {
      this.setError(err.description)
    });
  }


  private setError(description:string) {
    this.error = description;
    this.readingData = false;
    this.needPin = true;
  }

  private checkUseCan(usecan) {
    if (usecan) {
      this.pinType = 'Can';
    }
    else {
      this.pinType = 'Pin';

    }
  }
}
