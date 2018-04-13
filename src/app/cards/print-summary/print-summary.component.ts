import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-print-summary',
  templateUrl: './print-summary.component.html',
  styleUrls: ['./print-summary.component.less']
})
export class PrintSummaryComponent {
  @Input() printFunction;

  constructor() { }

}
