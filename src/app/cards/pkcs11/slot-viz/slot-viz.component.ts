import { Component, Input, OnChanges } from '@angular/core';
import { Connector } from '../../../connector.service';

@Component({
  selector: 'app-slot-viz',
  templateUrl: './slot-viz.component.html',
  styleUrls: ['./slot-viz.component.less']
})
export class SlotVizComponent implements OnChanges {
  @Input() slotId;
  readingToken;
  readingCerts;
  token;
  certs;

  constructor(private Connector: Connector) { }

  ngOnChanges() {
    const comp = this;
    comp.reset();
    // get info for slotId
    setTimeout(() => {
      comp.Connector.plugin('pkcs11', 'token', [], [comp.slotId]).then(tokenData => {
        comp.readingToken = false;
        comp.token = tokenData.data;
        setTimeout(() => {
          comp.Connector.get().pkcs11().certificates(comp.slotId, { parseCerts: true }).then(certData => {
            comp.readingCerts = false;
            comp.certs = certData.data;
          });
        }, 2500);
      });
    }, 5000);
  }

  reset() {
    this.readingToken = true;
    this.readingCerts = true;
    this.token = undefined;
    this.certs = undefined;
  }
}
