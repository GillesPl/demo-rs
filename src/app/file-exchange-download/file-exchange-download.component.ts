import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';
import {Observable} from 'rxjs/Observable';
import {RequestOptions, ResponseContentType} from '@angular/http';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-file-exchange-download',
  templateUrl: './file-exchange-download.component.html',
  styleUrls: ['./file-exchange-download.component.less']
})
export class FileExchangeDownloadComponent implements OnInit {
  exampleFile = 'https://storage.googleapis.com/rmc-test-files/T1T_test_green.pdf';
  entity;
  type;
  relpath;

  constructor(private Connector: Connector, private eventService: EventService, private http: HttpClient) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {}

  downloadSimpleExample() {
    console.log('File downloaded started');
    this.downloadFile('t1t', 'rmc-example', ['example-folder'], true, true);
  }

  download(entity, type, file, relpath, createMissingDir, notifyOnCompletion) {
    this.Connector.plugin('filex', 'download', [],
      [entity.entity, entity.type, file, 'demo.pdf', relpath, createMissingDir, notifyOnCompletion]).then(res => {
      console.log('File downloaded');
    });
  }

  downloadFile(entity, type, relpath, createMissingDir, notifyOnCompletion) {
    this.getFile(this.exampleFile).subscribe((fileData) => {
          const innerFile = new Blob([fileData], { type: 'application/pdf' });
          this.download(entity, type, innerFile, relpath, createMissingDir, notifyOnCompletion);
        }
      );
  }

  public getFile(path: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Origin': 'http://localhost:4200' })
    };
    return this.http.get(path, httpOptions);
  }
}
