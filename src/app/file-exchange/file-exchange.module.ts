import { NgModule } from '@angular/core';
import {FileExchangeMiscComponent} from './file-exchange-misc/file-exchange-misc.component';
import {FileExchangeTypeopsComponent} from './file-exchange-typeops/file-exchange-typeops.component';
import {FileExchangeFileopsComponent} from './file-exchange-fileops/file-exchange-fileops.component';
import {FileExchangeTypesComponent} from './file-exchange-types/file-exchange-types.component';
import {FileExchangeUploadComponent} from './file-exchange-upload/file-exchange-upload.component';
import {FileExchangeDownloadComponent} from './file-exchange-download/file-exchange-download.component';

@NgModule({
  imports: [],
  declarations: [
    FileExchangeMiscComponent,
    FileExchangeTypesComponent,
    FileExchangeTypeopsComponent,
    FileExchangeFileopsComponent,
    FileExchangeUploadComponent,
    FileExchangeDownloadComponent
  ],
  entryComponents: [],
  exports: [
    FileExchangeMiscComponent,
    FileExchangeTypesComponent,
    FileExchangeTypeopsComponent,
    FileExchangeFileopsComponent,
    FileExchangeUploadComponent,
    FileExchangeDownloadComponent
  ]
})
export class FileExchangeModule { }
