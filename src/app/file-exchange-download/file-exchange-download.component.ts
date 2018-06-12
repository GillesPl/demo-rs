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
  inEntity;
  inType;
  isNotificationEnabled;
  isImplicitCreationEnabled;
  pdfSrc;

  constructor(private Connector: Connector, private eventService: EventService, private http: HttpClient) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {
    this.pdfSrc = '/assets/test.pdf';
    this.isNotificationEnabled = true;
    this.isImplicitCreationEnabled = true;
    // this.pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf'; <= cors when doing this online
  }

  getData() {
  }

  downloadSimpleExample(entity, type, relpath) {
    console.log('File downloaded started');
    this.downloadFile(entity, type, relpath);
  }

  connDownloadFile(entity, type, file, relpath) {
    this.Connector.plugin('filex', 'download', [],
      [entity, type, file, 'test.pdf', this.cleanArray(relpath.split('/')), this.isImplicitCreationEnabled,
        this.isNotificationEnabled]).then(res => { // comma separated
      console.log('File downloaded: ' + res.data);
    });
  }

  downloadFile(entity, type, relpath) {
    this.downloadFileFromURL().subscribe((fileData) => {
        this.connDownloadFile(entity, type, fileData, relpath);
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

  // Will remove all falsy values: undefined, null, 0, false, NaN and "" (empty string)
  cleanArray(actual) {
    const newArr = new Array();
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArr.push(actual[i]);
      }
    }
    return newArr;
  }
}
