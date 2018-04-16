import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mobib-active-status',
  templateUrl: './mobib-active-status.component.html',
  styleUrls: ['./mobib-active-status.component.less']
})
export class MobibActiveStatusComponent {
  @Input() status;

  constructor() { }
}
