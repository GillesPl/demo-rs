import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobib-basic-card',
  templateUrl: './mobib-basic-card.component.html',
  styleUrls: ['./mobib-basic-card.component.less']
})
export class MobibBasicCardComponent implements OnInit {
  @Input() cardData;
  formattedCardNumber;

  constructor() { }

  ngOnInit() {
    this.formattedCardNumber = this.cardData['card-issuing'].card_holder_id.substr(0, 6) + ' / ' +
      this.cardData['card-issuing'].card_holder_id.substr(6,  10) + ' ' +
      this.cardData['card-issuing'].card_holder_id.substr(16, 2) + ' / ' +
      this.cardData['card-issuing'].card_holder_id.substr(18, 1);
  }

}
