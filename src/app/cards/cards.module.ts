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
import { MobibActiveStatusComponent } from './mobib/mobib-active-status/mobib-active-status.component';
import { MobibValidityStatusComponent } from './mobib/mobib-validity-status/mobib-validity-status.component';
import { MobibBasicCardComponent } from './mobib/mobib-basic-card/mobib-basic-card.component';
import { MobibNmbsCardComponent } from './mobib/mobib-nmbs-card/mobib-nmbs-card.component';
import { MobibMivbCardComponent } from './mobib/mobib-mivb-card/mobib-mivb-card.component';
import { MobibDeLijnCardComponent } from './mobib/mobib-de-lijn-card/mobib-de-lijn-card.component';
import { MobibTecCardComponent } from './mobib/mobib-tec-card/mobib-tec-card.component';
import { MobibContractTableComponent } from './mobib/mobib-contract-table/mobib-contract-table.component';
import { PinCheckModalComponent } from './pin-check-modal/pin-check-modal.component';
import { KeypadModule } from '../rmc-keypad/keypad.module';
import { PteidAddressPinModalComponent } from './pteid/pteid-address-pin-modal/pteid-address-pin-modal.component';
import { DownloadSummaryModalComponent } from './download-summary-modal/download-summary-modal.component';
import { FileSaverModule } from 'ngx-filesaver';
import { ModalService } from './modal.service';
import { DownloadXmlModalComponent } from './download-xml-modal/download-xml-modal.component';
import { ChallengeModalComponent } from './ocra/challenge-modal/challenge-modal.component';


@NgModule({
  imports: [
    AlertModule.forRoot(),
    Angular2FontawesomeModule,
    CommonModule,
    CollapseModule.forRoot(),
    ClipboardModule,
    FileSaverModule,
    FormsModule,
    KeypadModule,
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
    MobibVizComponent,
    OberthurCardComponent,
    OberthurVizComponent,
    PivCardComponent,
    PivVizComponent,
    PteidCardComponent,
    PteidVizComponent,
    PteidPinCheckStatusComponent,
    PteidAddressPinCheckStatusComponent,
    MobibActiveStatusComponent,
    MobibValidityStatusComponent,
    MobibBasicCardComponent,
    MobibNmbsCardComponent,
    MobibMivbCardComponent,
    MobibDeLijnCardComponent,
    MobibTecCardComponent,
    MobibContractTableComponent,
    PinCheckModalComponent,
    PteidAddressPinModalComponent,
    DownloadSummaryModalComponent,
    DownloadXmlModalComponent,
    ChallengeModalComponent
  ],
  providers: [
    BeidService,
    CheckDigitService,
    DnieService,
    EmvService,
    LuxService,
    LuxTrustService,
    MobibService,
    ModalService,
    OberthurService,
    PivService,
    PteidService,
  ],
  exports: [
    BeidVizComponent,
    DnieVizComponent,
    EmvVizComponent,
    LuxVizComponent,
    LuxTrustVizComponent,
    MobibVizComponent,
    OberthurVizComponent,
    OcraVizComponent,
    PivVizComponent,
    PteidVizComponent,
  ],
  entryComponents: [ ChallengeModalComponent, PinCheckModalComponent,
    DownloadSummaryModalComponent, DownloadXmlModalComponent ]
})
export class CardsModule { }
