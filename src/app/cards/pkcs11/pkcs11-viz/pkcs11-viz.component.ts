import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pkcs11-viz',
  templateUrl: './pkcs11-viz.component.html',
  styleUrls: ['./pkcs11-viz.component.less']
})
export class Pkcs11VizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;
  currentSlotId;

  constructor() { }

  ngOnInit() {
    this.currentSlotId = 1;
  }

  selectSlot(slot) {
    this.currentSlotId = slot.slot_id;
  }

}
