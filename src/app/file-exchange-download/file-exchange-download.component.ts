import {Component, OnInit} from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';
import {Observable} from 'rxjs/Observable';
import {RequestMethod, RequestOptions, ResponseContentType} from '@angular/http';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-file-exchange-download',
  templateUrl: './file-exchange-download.component.html',
  styleUrls: ['./file-exchange-download.component.less']
})
export class FileExchangeDownloadComponent implements OnInit {
  entity;
  type;
  relpath;
  pdfSrc;

  constructor(private Connector: Connector, private eventService: EventService, private http: HttpClient) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {
    this.pdfSrc = '/assets/test.pdf';
    // this.pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf'; <= cors when doing this online
  }

  getData() {
  }

  downloadSimpleExample() {
    console.log('File downloaded started');
    this.downloadFile('t1c', 'test', ['downloads'], true, true);
  }

  download(entity, type, file, relpath, createMissingDir, notifyOnCompletion) {
    this.Connector.plugin('filex', 'download', [],
      [entity, type, file, 'test.pdf', 'subfolder', createMissingDir, notifyOnCompletion]).then(res => { // comma separated
      console.log('File downloaded: ' + res.data);
    });
  }

  downloadFile(entity, type, relpath, createMissingDir, notifyOnCompletion) {
    this.downloadFileFromURL().subscribe((fileData) => {
        this.download(entity, type, fileData, relpath, createMissingDir, notifyOnCompletion);
      }
    );
  }

  downloadFileFromURL(): Observable<ArrayBuffer> {
    // for future use when issue is resolved on angular http
/*    const responseTypeOptions = {
      responseType: 'blob',
      observe: 'response',
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };*/
    // had to any-type because get with options for blob was not found in IDE
    return this.http.get(this.pdfSrc, <any>{ responseType: 'blob',
      headers: new HttpHeaders( {'Content-Type': 'application/x-www-form-urlencoded'}) } );
  }
}
