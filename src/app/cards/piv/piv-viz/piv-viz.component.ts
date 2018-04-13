import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';

@Component({
  selector: 'app-piv-viz',
  templateUrl: './piv-viz.component.html',
  styleUrls: ['./piv-viz.component.less']
})
export class PivVizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;

  needPin;
  pinpad;
  pincode;
  readingData;
  pinStatus;

  constructor(private Connector: Connector) { }

  ngOnInit() {
    const comp = this;
    comp.pinStatus = 'idle';
    comp.needPin = true;

    // check type of reader
    comp.Connector.core('reader', [comp.readerId]).then(res => {
      comp.pinpad = res.data.pinpad;
      if (!comp.pinpad) {
        comp.pincode = { value: '' };
      } else {
        // launch data request
        comp.getAllData(null);
      }
    });
  }


  submitPin() {
    this.needPin = false;
    this.getAllData(this.pincode.value);
  }

  getAllData(pin) {
    const comp = this;
    comp.readingData = true;
    comp.Connector.plugin('piv', 'printedInformation', [comp.readerId], [{ pin }]).then(res => {
      comp.cardData = res.data;
      comp.pinStatus = 'valid';
      comp.readingData = false;
    }, () => {
      // TODO not all PIV/CIV cards support printedinformation, need to use
      // allData call once it is implemented
      comp.pinStatus = 'valid';
      comp.readingData = false;
    });
  }

  checkPin() {}
}
