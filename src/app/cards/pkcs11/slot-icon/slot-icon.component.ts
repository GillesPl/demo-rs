import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slot-icon',
  templateUrl: './slot-icon.component.html',
  styleUrls: ['./slot-icon.component.less']
})
export class SlotIconComponent implements OnInit {
  @Input() index;
  @Input() slot;
  @Input() currentSlotId;
  @Output() onSelect = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectSlot() {
    this.onSelect.emit(this.slot);
  }

}
