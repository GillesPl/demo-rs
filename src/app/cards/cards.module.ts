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
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Ng2FittextModule } from 'ng2-fittext';
import { KeypadModule } from '../rmc-keypad/keypad.module';
import { ModalService } from './modal.service';
import {ToggleComponent} from '../toggle/toggle.component';
import {SwitchComponent} from '../switch/switch.component';
import {HttpClientModule} from '@angular/common/http';
import {DemoRsService} from '../card-visualizer/demo-rs.service';


@NgModule({
  imports: [
    AlertModule.forRoot(),
    Angular2FontawesomeModule,
    CommonModule,
    CollapseModule.forRoot(),
    ClipboardModule,
    FormsModule,
    KeypadModule,
    Ng2FittextModule,
    TooltipModule.forRoot(),
    HttpClientModule
  ],
  declarations: [
    SwitchComponent,
    ToggleComponent,
    BeidCardComponent,
    BeidVizComponent,

  ],
  providers: [
    BeidService,
    CheckDigitService,
    ModalService,
    DemoRsService
  ],
  exports: [
    BeidVizComponent
  ],
  entryComponents: []
})
export class CardsModule { }
