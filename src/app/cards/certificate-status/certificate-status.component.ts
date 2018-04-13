import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-certificate-status',
  templateUrl: './certificate-status.component.html',
  styleUrls: ['./certificate-status.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CertificateStatusComponent {
  @Input() status;

  constructor() { }

}
