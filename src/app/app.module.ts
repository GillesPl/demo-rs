import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RmcHeaderComponent } from './rmc-header/rmc-header.component';
import { RmcFaqComponent } from './rmc-faq/rmc-faq.component';
import { RmcFooterComponent } from './rmc-footer/rmc-footer.component';
import { RmcKeypadComponent } from './rmc-keypad/rmc-keypad.component';
import { ReaderIconComponent } from './reader-icon/reader-icon.component';
import { ReaderSelectComponent } from './reader-select/reader-select.component';
import { CardPollingComponent } from './card-polling/card-polling.component';
import { ReaderPollingComponent } from './reader-polling/reader-polling.component';
import { DownloadGclComponent } from './download-gcl/download-gcl.component';
import { CardVisualizerComponent } from './card-visualizer/card-visualizer.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Connector} from './connector.service';
import {EventService} from './event.service';
import {T1cInfoComponent} from './t1c-info/t1c-info.component';
import {DeviceInfoComponent} from './device-info/device-info.component';
import {DependencyInfoComponent} from './dependency-info/dependency-info.component';
import {CardReaderInfoComponent} from './card-reader-info/card-reader-info.component';
import {LogInfoComponent} from './log-info/log-info.component';
import {ApiService} from './api.service';
import {ContainerInfoComponent} from './container-info/container-info.component';
import { LogViewerComponent } from './log-viewer/log-viewer.component';
import {FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RmcConsentComponent } from './rmc-consent/rmc-consent.component';
import {RMC} from './rmc.service';


@NgModule({
  declarations: [
    AppComponent,
    RmcHeaderComponent,
    RmcFaqComponent,
    RmcFooterComponent,
    // RmcKeypadComponent,
    ReaderIconComponent,
    T1cInfoComponent,
    CardReaderInfoComponent,
    ContainerInfoComponent,
    DeviceInfoComponent,
    DependencyInfoComponent,
    LogInfoComponent,
    LogViewerComponent,
    DownloadGclComponent,
    RmcConsentComponent,
    // ReaderSelectComponent,
    CardPollingComponent,
    ReaderPollingComponent,
    DownloadGclComponent,
    // CardVisualizerComponent
  ],
  imports: [
    Angular2FontawesomeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [ ApiService, Connector, EventService, RMC ],
  bootstrap: [AppComponent]
})
export class AppModule { }
