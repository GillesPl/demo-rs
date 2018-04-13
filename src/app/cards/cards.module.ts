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
import { DnieVizComponent } from './dnie/dnie-viz/dnie-viz.component';
import { DnieCardComponent } from './dnie/dnie-card/dnie-card.component';
import { EmvVizComponent } from './emv/emv-viz/emv-viz.component';
import { EmvCardComponent } from './emv/emv-card/emv-card.component';
import { DnieService } from './dnie/dnie.service';
import { EmvService } from './emv/emv.service';
import { LuxService } from './lux/lux.service';
import { LuxTrustService } from './lux/lux-trust.service';
import { MobibService } from './mobib/mobib.service';
import { OberthurService } from './oberthur/oberthur.service';
import { PivService } from './piv/piv.service';
import { PteidService } from './pteid/pteid.service';


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
    PrintSummaryComponent,
    DnieVizComponent,
    DnieCardComponent,
    EmvVizComponent,
    EmvCardComponent
  ],
  providers: [
    BeidService,
    CheckDigitService,
    DnieService,
    EmvService,
    LuxService,
    LuxTrustService,
    MobibService,
    OberthurService,
    PivService,
    PteidService
  ],
  exports: [ BeidVizComponent, DnieVizComponent ]
})
export class CardsModule { }
