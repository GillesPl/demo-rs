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
import { LuxCardComponent } from './lux/lux-card/lux-card.component';
import { LuxVizComponent } from './lux/lux-viz/lux-viz.component';
import { LuxTrustCardComponent } from './lux/lux-trust-card/lux-trust-card.component';
import { LuxTrustVizComponent } from './lux/lux-trust-viz/lux-trust-viz.component';
import { OcraVizComponent } from './ocra/ocra-viz/ocra-viz.component';
import { OcraCardComponent } from './ocra/ocra-card/ocra-card.component';
import { LuxPinCheckStatusComponent } from './lux/lux-pin-check-status/lux-pin-check-status.component';
import { MobibCardComponent } from './mobib/mobib-card/mobib-card.component';
import { MobibVizComponent } from './mobib/mobib-viz/mobib-viz.component';
import { OberthurCardComponent } from './oberthur/oberthur-card/oberthur-card.component';
import { OberthurVizComponent } from './oberthur/oberthur-viz/oberthur-viz.component';
import { PivCardComponent } from './piv/piv-card/piv-card.component';
import { PivVizComponent } from './piv/piv-viz/piv-viz.component';
import { Ng2FittextModule } from 'ng2-fittext';
import { PteidCardComponent } from './pteid/pteid-card/pteid-card.component';
import { PteidVizComponent } from './pteid/pteid-viz/pteid-viz.component';
import { PteidPinCheckStatusComponent } from './pteid/pteid-pin-check-status/pteid-pin-check-status.component';
import { PteidAddressPinCheckStatusComponent } from './pteid/pteid-address-pin-check-status/pteid-address-pin-check-status.component';


@NgModule({
  imports: [
    AlertModule.forRoot(),
    Angular2FontawesomeModule,
    CommonModule,
    CollapseModule.forRoot(),
    ClipboardModule,
    FormsModule,
    Ng2FittextModule,
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
    EmvCardComponent,
    LuxCardComponent,
    LuxVizComponent,
    LuxTrustCardComponent,
    LuxTrustVizComponent,
    OcraVizComponent,
    OcraCardComponent,
    LuxPinCheckStatusComponent,
    MobibCardComponent,
    MobibVizComponent,
    OberthurCardComponent,
    OberthurVizComponent,
    PivCardComponent,
    PivVizComponent,
    PteidCardComponent,
    PteidVizComponent,
    PteidPinCheckStatusComponent,
    PteidAddressPinCheckStatusComponent
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
  exports: [
    BeidVizComponent,
    DnieVizComponent,
    EmvVizComponent,
    LuxVizComponent,
    LuxTrustVizComponent,
    OberthurVizComponent,
    OcraVizComponent,
    PivVizComponent,
    PteidVizComponent
  ]
})
export class CardsModule { }
