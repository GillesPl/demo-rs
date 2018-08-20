import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RmcHeaderComponent} from './rmc-header/rmc-header.component';
import {RmcFaqComponent} from './rmc-faq/rmc-faq.component';
import {RmcFooterComponent} from './rmc-footer/rmc-footer.component';
import {ReaderIconComponent} from './reader-icon/reader-icon.component';
import {ReaderSelectComponent} from './reader-select/reader-select.component';
import {CardPollingComponent} from './card-polling/card-polling.component';
import {ReaderPollingComponent} from './reader-polling/reader-polling.component';
import {DownloadGclComponent} from './download-gcl/download-gcl.component';
import {CardVisualizerComponent} from './card-visualizer/card-visualizer.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
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
import {LogViewerComponent} from './log-viewer/log-viewer.component';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {RmcConsentComponent} from './rmc-consent/rmc-consent.component';
import {RMC} from './rmc.service';
import {CardService} from './cards/card.service';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {CardsModule} from './cards/cards.module';
import {CollapseModule} from 'ngx-bootstrap';
import {KeypadModule} from './rmc-keypad/keypad.module';
import {Angulartics2RouterlessModule} from 'angulartics2/routerlessmodule';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {Angulartics2Module} from 'angulartics2';
import {RouterModule, Routes} from '@angular/router';
import {Pkcs11ConfigComponent} from './pkcs11-config/pkcs11-config.component';
import {RmcDownloadFailedComponent} from './rmc-download-failed/rmc-download-failed.component';
import {CitrixUserSelectModalComponent} from './citrix-user-select-modal/citrix-user-select-modal.component';
import {CitrixService} from './citrix.service';
import {ConsentModalComponent} from './consent-modal/consent-modal.component';
import {FileExchangeMiscComponent} from './file-exchange-misc/file-exchange-misc.component';
import {FileExchangeTypesComponent} from './file-exchange-types/file-exchange-types.component';
import {FileExchangeTypeopsComponent} from './file-exchange-typeops/file-exchange-typeops.component';
import {FileExchangeFileopsComponent} from './file-exchange-fileops/file-exchange-fileops.component';
import {FileExchangeUploadComponent} from './file-exchange-upload/file-exchange-upload.component';
import {FileExchangeDownloadComponent} from './file-exchange-download/file-exchange-download.component';
import {UserIdentificationSharedEnvComponent} from './user-identification-shared-env/user-identification-shared-env.component';
import {FileExchangeFileViewComponent} from './file-exchange-types/file-exchange-file-view/file-exchange-file-view.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {GenerateKeyPairComponent} from './java-key-tool/generate-key-pair/generate-key-pair.component';
import {GenerateCertificateRequestComponent} from './java-key-tool/generate-certificate-request/generate-certificate-request.component';
import {ImportCertificateComponent} from './java-key-tool/import-certificate/import-certificate.component';

const locale = localStorage.getItem('rmc-locale');

// Use of router is required by Angulartics2
const ROUTES: Routes = [
  {path: '', component: AppComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    RmcHeaderComponent,
    RmcFaqComponent,
    RmcFooterComponent,
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
    ReaderSelectComponent,
    CardPollingComponent,
    ReaderPollingComponent,
    DownloadGclComponent,
    CardVisualizerComponent,
    Pkcs11ConfigComponent,
    RmcDownloadFailedComponent,
    CitrixUserSelectModalComponent,
    ConsentModalComponent,
    FileExchangeMiscComponent,
    FileExchangeTypesComponent,
    FileExchangeTypeopsComponent,
    FileExchangeFileopsComponent,
    FileExchangeUploadComponent,
    FileExchangeDownloadComponent,
    UserIdentificationSharedEnvComponent,
    FileExchangeFileViewComponent,
    GenerateKeyPairComponent,
    GenerateCertificateRequestComponent,
    ImportCertificateComponent
  ],
  imports: [
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    Angular2FontawesomeModule,
    BrowserModule,
    CardsModule,
    ClipboardModule,
    CollapseModule.forRoot(),
    FormsModule,
    HttpClientModule,
    KeypadModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    TooltipModule.forRoot(),
    PdfViewerModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: locale},
    ApiService,
    CardService,
    CitrixService,
    Connector,
    EventService,
    RMC
  ],
  bootstrap: [AppComponent],
  entryComponents: [CitrixUserSelectModalComponent, ConsentModalComponent, UserIdentificationSharedEnvComponent, FileExchangeFileViewComponent]
})
export class AppModule {
}
