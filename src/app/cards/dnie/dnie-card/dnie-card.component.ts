import { Component, Input, OnInit } from '@angular/core';
import { DnieService } from '../dnie.service';

@Component({
  selector: 'app-dnie-card',
  templateUrl: './dnie-card.component.html',
  styleUrls: ['./dnie-card.component.less']
})
export class DnieCardComponent implements OnInit {
  @Input() cardData;

  machineReadable1;
  machineReadable2;
  machineReadable3;

  constructor(private dnie: DnieService) { }

  ngOnInit() {
    console.log(this.cardData);
    const mrs = this.dnie.constructMachineReadableStrings(this.cardData.info);

    this.machineReadable1 = mrs[0];
    this.machineReadable2 = mrs[1];
    this.machineReadable3 = mrs[2];
  }

}
