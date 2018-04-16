import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from '../../event.service';
import { BsModalRef } from 'ngx-bootstrap';
import { FileSaverService } from 'ngx-filesaver';
import { CardService } from '../card.service';

@Component({
  selector: 'app-download-xml-modal',
  templateUrl: './download-xml-modal.component.html',
  styleUrls: ['./download-xml-modal.component.less']
})
export class DownloadXmlModalComponent implements OnInit {
  readerId;
  pincode;
  pinpad;
  generatedFile;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  currentStep;
  needPinToGenerate: boolean;
  enterPin: boolean;

  // utility to use to generate summary
  util;

  // text statuses
  generateText;
  pinText;
  downloadText;

  constructor(public bsModalRef: BsModalRef,
              private eventService: EventService,
              private cardService: CardService,
              private FileSaver: FileSaverService) {
    this.eventService.startOver$.subscribe(() => this.cancel());
  }

  ngOnInit() {
    this.generateText = 'initial';
    this.pinText = 'initial';
    this.downloadText = 'initial';
    this.currentStep = 0;
  }

  ok() {
    this.bsModalRef.hide();
  }

  cancel() {
    this.bsModalRef.hide();
  }

  doDownload() {
    const comp = this;
    this.cardService.downloadRaw(comp.generatedFile.viewLink).toPromise().then(function (xml: any) {
      comp.handleDownload(xml, comp.generatedFile.origFilename);
      comp.ok();
    });
  }

  handleDownload(data, fileName) {
    this.FileSaver.save(data, fileName);
  }

  submitPin(pinCode) {
    const comp = this;
    comp.enterPin = false;
    if (comp.needPinToGenerate) {
      // still need to generate the summary
      comp.generateText = 'ongoing';
      comp.util.generateXMLToSign(comp.readerId, pinCode).then(res => {
        comp.generatedFile = res;
        comp.currentStep = 2;
        comp.generateText = 'done';
        comp.doSign(pinCode);
      });
    } else {
      // summary has been generated, do sign
      comp.doSign(pinCode);
    }
  }

  doSign(pinCode) {
    const component = this;
    component.pinText = 'ongoing';
    let pin;
    if (pinCode && pinCode.length) { pin = pinCode; }
    component.cardService.signDocument(component.generatedFile.id, component.readerId, pin).then(() => {
      component.currentStep = 3;
      component.pinText = 'done';
      component.downloadText = 'ongoing';
    });
  }

  startProcess() {
    const comp = this;
    this.currentStep = 1;

    if (comp.needPinToGenerate) {
      comp.enterPin = true;
    } else {
      comp.generateText = 'ongoing';
      comp.util.generateXMLToSign(comp.readerId).then(function (res) {
        comp.generatedFile = res;
        comp.currentStep = 2;
        comp.generateText = 'done';

        if (comp.pinpad) {
          // start signing process
          comp.pinText = 'ongoing-reader';
          comp.cardService.signDocument(comp.generatedFile.id, comp.readerId, undefined).then(() => {
            comp.currentStep = 3;
            comp.pinText = 'done';
            comp.downloadText = 'ongoing';
          });
        } else {
          // prompt user to enter pin
          comp.enterPin = true;
        }
      });
    }
  }

}
