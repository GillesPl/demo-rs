import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-file-exchange-fileops',
  templateUrl: './file-exchange-fileops.component.html',
  styleUrls: ['./file-exchange-fileops.component.less']
})
export class FileExchangeFileopsComponent implements OnInit {
  fileExists: boolean;
  existingEntity: string;
  existingType: string;
  existingFilePath: string[];

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {}

  getData() {}

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
