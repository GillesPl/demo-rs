import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from '../../event.service';
import { CardService } from '../card.service';
import { BsModalRef } from 'ngx-bootstrap';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download-summary-modal',
  templateUrl: './download-summary-modal.component.html',
  styleUrls: ['./download-summary-modal.component.less']
})
export class DownloadSummaryModalComponent implements OnInit {
  readerId;
  pinpad;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  currentStep: number;
  needPinToGenerate: boolean;
  generatedFile;
  enterPin: boolean;

  // utility to use to generate summary
  util;

  // text statuses
  generateText;
  pinText;
  downloadText;

  constructor(public bsModalRef: BsModalRef,
              private eventService: EventService,
              private cardService: CardService) {
    this.eventService.startOver$.subscribe(() => this.cancel());
  }

  static handleDownload(blob, fileName) {
    saveAs(blob, fileName);
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
    this.cardService.downloadDocument(comp.generatedFile.origFilename).toPromise().then(function (signedPdf: any) {
      DownloadSummaryModalComponent.handleDownload(signedPdf, comp.generatedFile.origFilename);
      comp.ok();
    });
  }

  submitPin(pinCode) {
    const comp = this;
    comp.enterPin = false;
    if (comp.needPinToGenerate) {
      // still need to generate the summary
      comp.generateText = 'ongoing';
      comp.util.generateSummaryToSign(comp.readerId, pinCode).then(res => {
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

    if (this.needPinToGenerate) {
      comp.enterPin = true;
    } else {
      comp.generateText = 'ongoing';
      comp.util.generateSummaryToSign(comp.readerId).then(function (res) {
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
