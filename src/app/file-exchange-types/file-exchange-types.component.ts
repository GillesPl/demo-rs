import {Component, OnInit} from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';
import {BsModalService} from 'ngx-bootstrap';
import {ConsentModalComponent} from '../consent-modal/consent-modal.component';
import {FileExchangeFileViewComponent} from './file-exchange-file-view/file-exchange-file-view.component';

@Component({
  selector: 'app-file-exchange-types',
  templateUrl: './file-exchange-types.component.html',
  styleUrls: ['./file-exchange-types.component.less']
})
export class FileExchangeTypesComponent implements OnInit {
  entities;
  files;
  totalFiles;
  selectedEntity;

  // listTypes (for entity input)
  selectedTypes;
  inputEntity;

  constructor(private Connector: Connector, private eventService: EventService, private modalService: BsModalService,) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {
  }

  getData() {
    this.Connector.plugin('filex', 'listTypes', [], []).then(res => {
      this.entities = res.data;
    });
  }

  getTypesForEntity(entity) {
    this.Connector.plugin('filex', 'listTypes', [], [entity.entity]).then(res => {
      this.selectedTypes = res.data;
      this.inputEntity = entity.entity;
      this.eventService.refreshFileExcchangeData();
    });
  }

  getFilesForType(entity, optionalPath, pgStart, pgSize, pgSort) {
    let typePath: string [];
    let paging;
    if (optionalPath) {
      typePath = this.cleanArray(optionalPath.split('/'));
    } else {
      typePath = undefined;
    }
    //paging
    if (pgStart && pgSize && pgSort) {
      paging = {
        start: +pgStart,
        size: +pgSize,
        sort: pgSort.toLowerCase()
      };
    }
    this.Connector.plugin('filex', 'listTypeContent', [], [entity.entity, entity.type, typePath, paging]).then(res => {
      this.files = res.data.files;
      this.totalFiles = res.data.total;
      this.selectedEntity = entity;
    });
  }

  getTypeInfo(entity) {
    this.Connector.plugin('filex', 'listType', [], [entity.entity, entity.type]).then(res => {
      this.selectedEntity = res.data;
    });
  }

  resetTypeInfo(entity) {
    this.selectedEntity = undefined;
  }

  deleteTypeMapping(entity) {
    let selectedEntity, selectedType;
    if(entity.entity) { selectedEntity = entity.entity } else { selectedEntity = '' }
    if(entity.type) { selectedType = entity.type } else { selectedType = '' }
    this.Connector.plugin('filex', 'deleteType', [], [entity.entity, entity.type]).then(res => {
      this.files = undefined;
      this.totalFiles = 0;
      this.eventService.refreshFileExcchangeData();
    });
  }

  updateTypeMapping(entity) {
    this.Connector.plugin('filex', 'updateType', [], [entity.entity, entity.type, 30]).then(res => {
      this.files = undefined;
      this.totalFiles = 0;
      this.eventService.refreshFileExcchangeData();
    });
  }

  uploadFile(file) {
    console.log('upload file: ' + file.name);
  }

  getFileInfo(file) {
    // open consent code modal with selected file info
    const svc = this;
    this.Connector.plugin('filex', 'getFileInfo', [], [file.entity, file.type, file.name, file.rel_path]).then(res => {
      const initialState = {
        selectedFile: res.data
      };
      const config = {
        backdrop: true,
        class: 'modal-lg',
        ignoreBackdropClick: true,
        initialState
      };
      this.modalService.show(FileExchangeFileViewComponent, Object.assign({}, config, {initialState}));
    });
  }

  // Will remove all falsy values: undefined, null, 0, false, NaN and "" (empty string)
  cleanArray(actual) {
    const newArr = new Array();
    console.log('array found');
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArr.push(actual[i]);
      }
    }
    return newArr;
  }
}
