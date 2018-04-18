import { Component, Input, OnInit } from '@angular/core';
import { LuxService } from '../lux.service';

@Component({
  selector: 'app-lux-card',
  templateUrl: './lux-card.component.html',
  styleUrls: ['./lux-card.component.less']
})
export class LuxCardComponent implements OnInit {
  @Input() biometricData;
  @Input() picData;
  @Input() signatureData;

  formattedBirthDate;
  formattedValidFrom;
  formattedValidUntil;
  machineReadable1;
  machineReadable2;
  machineReadable3;

  constructor(private Lux: LuxService) { }

  ngOnInit() {
    this.formattedBirthDate = LuxService.formatBirthDate(this.biometricData.birthDate);
    this.formattedValidFrom = LuxService.formatValidity(this.biometricData.validityStartDate);
    this.formattedValidUntil = LuxService.formatValidity(this.biometricData.validityEndDate);

    const mrs = this.Lux.constructMachineReadableStrings(this.biometricData);

    this.machineReadable1 = mrs[0];
    this.machineReadable2 = mrs[1];
    this.machineReadable3 = mrs[2];
  }

}
