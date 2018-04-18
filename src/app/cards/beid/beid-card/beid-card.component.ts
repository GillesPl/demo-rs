import { Component, Input, OnInit } from '@angular/core';
import { BeidService } from '../beid.service';

@Component({
  selector: 'app-beid-card',
  templateUrl: './beid-card.component.html',
  styleUrls: ['./beid-card.component.less']
})
export class BeidCardComponent implements OnInit {
  @Input() rnData;
  @Input() picData;

  formattedCardNumber;
  formattedRRNR;
  machineReadable1;
  machineReadable2;
  machineReadable3;


  constructor(private beidService: BeidService) { }

  ngOnInit() {
    this.formattedCardNumber = BeidService.formatCardNumber(this.rnData.card_number);
    this.formattedRRNR = BeidService.formatRRNR(this.rnData.national_number);

    const mrs = this.beidService.constructMachineReadableStrings(this.rnData);

    this.machineReadable1 = mrs[0];
    this.machineReadable2 = mrs[1];
    this.machineReadable3 = mrs[2];
  }

}
