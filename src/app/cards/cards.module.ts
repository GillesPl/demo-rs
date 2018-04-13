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
import { PrintSummaryComponent } from './print-summary/print-summary.component';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  imports: [
    AlertModule.forRoot(),
    Angular2FontawesomeModule,
    CommonModule,
    CollapseModule.forRoot(),
    ClipboardModule,
    FormsModule,
    TooltipModule.forRoot(),
  ],
  declarations: [
    BeidCardComponent,
    BeidVizComponent,
    CertificateStatusComponent,
    PinCheckStatusComponent,
    PrintSummaryComponent
  ],
  providers: [ BeidService, CheckDigitService ],
  exports: [ BeidVizComponent ]
})
export class CardsModule { }
