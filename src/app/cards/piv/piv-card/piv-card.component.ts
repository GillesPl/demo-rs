import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-piv-card',
  templateUrl: './piv-card.component.html',
  styleUrls: ['./piv-card.component.less']
})
export class PivCardComponent {
  @Input() cardData;

  constructor() { }

}
