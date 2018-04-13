import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeidCardComponent } from './beid/beid-card/beid-card.component';
import { BeidVizComponent } from './beid/beid-viz/beid-viz.component';
import { BeidService } from './beid/beid.service';
import { CheckDigitService } from './check-digit.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ClipboardModule } from 'ngx-clipboard/dist';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { CertificateStatusComponent } from './certificate-status/certificate-status.component';
import { PinCheckStatusComponent } from './pin-check-status/pin-check-status.component';


@NgModule({
  imports: [
    AlertModule.forRoot(),
    Angular2FontawesomeModule,
    CommonModule,
    CollapseModule.forRoot(),
    ClipboardModule
  ],
  declarations: [
    BeidCardComponent,
    BeidVizComponent,
    CertificateStatusComponent,
    PinCheckStatusComponent
  ],
  providers: [ BeidService, CheckDigitService ],
  exports: [ BeidVizComponent ]
})
export class CardsModule { }
