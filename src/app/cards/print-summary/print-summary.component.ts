import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-print-summary',
  templateUrl: './print-summary.component.html',
  styleUrls: ['./print-summary.component.less']
})
export class PrintSummaryComponent {
  @Output() onPrint = new EventEmitter();

  constructor() { }

  doPrint() {
    this.onPrint.emit();
  }

}
