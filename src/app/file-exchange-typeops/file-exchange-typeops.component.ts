import { Component, OnInit } from '@angular/core';
import {Connector} from '../connector.service';
import {EventService} from '../event.service';

@Component({
  selector: 'app-file-exchange-typeops',
  templateUrl: './file-exchange-typeops.component.html',
  styleUrls: ['./file-exchange-typeops.component.less']
})
export class FileExchangeTypeopsComponent implements OnInit {
  showModal: boolean;
  createdType;

  constructor(private Connector: Connector, private eventService: EventService) {
    this.eventService.fileExchangePanelOpened$.subscribe(() => this.getData());
    this.eventService.refreshFileExchangeData$.subscribe(() => this.getData());
  }

  ngOnInit() {
    this.showModal = true; // default
  }

  getData() {}

  createType(entity, type, abspath) {
    const inputEntity = entity.value;
    const inputType = type.value;
    const inputInitAbsPath = abspath.value;
    console.log('path resulst:' + this.cleanArray(inputInitAbsPath.split('/')));
    this.Connector.plugin('filex', 'createType', [],
      [inputEntity, inputType, this.cleanArray(inputInitAbsPath.split('/')), this.showModal]).then(res => {
      this.createdType = res.data;
      this.eventService.refreshFileExcchangeData();
    });
  }

  updateModal() {
    this.showModal = !this.showModal;
    console.log('showModal: ' + this.showModal);
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
