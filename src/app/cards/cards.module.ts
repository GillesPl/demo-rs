import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeidCardComponent } from './beid/beid-card/beid-card.component';
import { BeidVizComponent } from './beid/beid-viz/beid-viz.component';
import { BeidService } from './beid/beid.service';
import { CheckDigitService } from './check-digit.service';
import { CollapseModule } from 'ngx-bootstrap';
import { ClipboardModule } from 'ngx-clipboard/dist';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';


@NgModule({
  imports: [
    Angular2FontawesomeModule,
    CommonModule,
    CollapseModule.forRoot(),
    ClipboardModule
  ],
  declarations: [
    BeidCardComponent,
    BeidVizComponent
  ],
  providers: [ BeidService, CheckDigitService ],
  exports: [ BeidVizComponent ]
})
export class CardsModule { }
