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
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    RmcHeaderComponent,
    RmcFaqComponent,
    RmcFooterComponent,
    // RmcKeypadComponent,
    // ReaderIconComponent,
    // ReaderSelectComponent,
    // CardPollingComponent,
    // ReaderPollingComponent,
    // DownloadGclComponent,
    // CardVisualizerComponent
  ],
  imports: [
    Angular2FontawesomeModule,
    BrowserModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
