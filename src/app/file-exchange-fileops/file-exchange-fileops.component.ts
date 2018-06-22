import {Component, OnInit} from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-file-exchange-fileops',
  templateUrl: './file-exchange-fileops.component.html',
  styleUrls: ['./file-exchange-fileops.component.less']
})
export class FileExchangeFileopsComponent implements OnInit {

  // for check if file exists
  existingEntity: string;
  existingType: string;
  existingFilePath: string[];
  fileExists: boolean;

  // for access mode of type, dir or file
  amEntity: string;
  amType: string;
  amFilePath: string[];
  accessMode: boolean;

  // move file
  mvFromEntity: string;
  mvFromType: string;
  mvFromRelPath: string[];
  mvFilename: string;
  mvToType: string;
  mvToRelPath: string[];
  movedFile;

  // copy file
  cpFromEntity: string;
  cpFromType: string;
  cpFromRelPath: string[];
  cpFilename: string;
  cpToType: string;
  cpToRelPath: string[];
  cpNewFilename: string;
  copiedFile;

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {
  }

  getData() {
  }

  existsFile(entity, type, filepath) {
    this.existingEntity = entity.value;
    this.existingType = type.value;
    this.existingFilePath = this.cleanArray(filepath.value.split('/'));
    // split to string array
    this.Connector.plugin('filex', 'existsFile', [],
      [this.existingEntity, this.existingType, this.existingFilePath]).then(res => {
      this.fileExists = res.data;
    });
  }

  getAccessMode(entity, type, filepath) {
    this.amEntity = entity.value;
    this.amType = type.value;
    this.amFilePath = this.cleanArray(filepath.value.split('/'));
    // split to string array
    this.Connector.plugin('filex', 'getAccessMode', [],
      [this.amEntity, this.amType, this.amFilePath]).then(res => {
      this.accessMode = res.data;
    });
  }

  moveFile(fromEnt, fromType, fromRelpath, filename, toType, toRelPath) {
    this.mvFromEntity = fromEnt.value;
    this.mvFromType = fromType.value;
    this.mvFromRelPath = this.cleanArray(fromRelpath.value.split('/'));
    this.mvFilename = filename.value;
    this.mvToType = toType.value;
    this.mvToRelPath = this.cleanArray(toRelPath.value.split('/'));
    this.Connector.plugin('filex', 'moveFile', [],
      [this.mvFromEntity, this.mvFromType, this.mvToType, this.mvFilename, this.mvFromRelPath, this.mvToRelPath]).then(res => {
        console.log('file: ' + res.data.name);
      this.movedFile = res.data;
    });
  }

  copyFile(fromEnt, fromType, fromRelpath, filename, toType, toRelPath, newFilename) {
    this.cpFromEntity = fromEnt.value;
    this.cpFromType = fromType.value;
    this.cpFromRelPath = this.cleanArray(fromRelpath.value.split('/'));
    this.cpFilename = filename.value;
    this.cpToType = toType.value;
    this.cpToRelPath = this.cleanArray(toRelPath.value.split('/'));
    this.cpNewFilename = newFilename.value;
    this.Connector.plugin('filex', 'copyFile', [],
      [this.cpFromEntity, this.cpFromType, this.cpToType, this.cpFilename, this.cpNewFilename, this.cpFromRelPath, this.cpToRelPath]).then(res => {
      console.log('file: ' + res.data.name);
      this.copiedFile = res.data;
    });
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
