import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-file-exchange-upload',
  templateUrl: './file-exchange-upload.component.html',
  styleUrls: ['./file-exchange-upload.component.less']
})
export class FileExchangeUploadComponent implements OnInit {
  entities;
  files;
  totalFiles;

  //upload use case
  selectedPDF;
  uploadedPDF: Uint8Array;

  constructor(private conn: Connector, private eventService: EventService) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {
    this.conn.plugin('filex', 'listTypes', [], []).then(res => {
      this.entities = res.data;
    });
  }

  getFilesForType(entity) {
    this.conn.plugin('filex', 'listTypeContent', [], [entity.entity, entity.type]).then(res => {
      this.files = res.data.files;
      this.totalFiles = res.data.total;
    });
  }

  deleteTypeMapping(entity) {
    this.conn.plugin('filex', 'deleteType', [], [entity.entity, entity.type]).then( res => {
      this.files = undefined;
      this.totalFiles = 0;
      this.eventService.refreshFileExcchangeData();
    });
  }

  uploadFile(file) {
    this.selectedPDF = file;
    this.conn.plugin('filex', 'upload', [], [file.entity, file.type, file.name, file.rel_path, true]).then(arbuf => {
      this.uploadedPDF = this.unifyArrayBuffer(arbuf);
      console.log('arbuf arraybuffer? '+ (arbuf instanceof ArrayBuffer));
      console.log('arbuf blob? '+ (arbuf instanceof Blob));
      console.log('arbuf value: '+ arbuf);
      console.log('uploadedPDF Uint8Array? '+ (this.uploadedPDF instanceof Uint8Array));
      console.log('uploadedPDF blob? '+ (this.uploadedPDF instanceof Blob));
      console.log('uploadedPDF value: '+ this.uploadedPDF.buffer);
/*
      var fileReader = new FileReader();
      fileReader.onload = () => {
        let arBufConverted = fileReader.result;
        let resBytes = new Uint8Array(arBufConverted);
        this.uploadModifiedFile(resBytes.buffer);
      };
      fileReader.readAsArrayBuffer(this.uploadedPDF);*/
    });
    console.log('uploaded file: ' + file.name);
  }

/*  uploadModifiedFile(bytes){
    this.conn.plugin('filex', 'download', [],
      ['belfius', 'coda', bytes, this.selectedPDF.name, undefined, false, true]).then(res => { // comma separated
      console.log('File downloaded: ' + res.data.name);
    });
  }*/

  unifyArrayBuffer(arbuf): Uint8Array {
    /*let binary_string =  window.atob(arbuf);*/
/*    let len = arbuf.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++){
      bytes[i] = arbuf.charCodeAt(i);
    }*/
    return new Uint8Array(arbuf);
  }

/*  downloadFile(entity, type){
    this.connDownloadFile(entity, type);
  }*/

/*  connDownloadFile(entity, type) {
    console.log('byte array: '+this.uploadedPDF);
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.uploadedPDF);

    fileReader.onload = (e) => {
      let dwFile = fileReader.result;
      this.conn.plugin('filex', 'download', [],
        [entity, type, dwFile, this.selectedPDF.name, undefined, false, true]).then(res => { // comma separated
        console.log('File downloaded: ' + res.data.name);
      });
    };
  }*/
}
