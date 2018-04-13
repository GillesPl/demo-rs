import { Component, Input, OnInit } from '@angular/core';
import { EmvService } from '../emv.service';

@Component({
  selector: 'app-emv-card',
  templateUrl: './emv-card.component.html',
  styleUrls: ['./emv-card.component.less']
})
export class EmvCardComponent implements OnInit {
  @Input() cardData;
  cardNumber;
  expiration;

  constructor(private Emv: EmvService) { }

  ngOnInit() {
    this.cardNumber = this.Emv.constructCardNumber(this.cardData.application_data.pan);
    this.expiration = this.Emv.constructExpirationDate(this.cardData.application_data.expiration_date);
  }

}
