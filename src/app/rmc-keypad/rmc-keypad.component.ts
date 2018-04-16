import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-rmc-keypad',
  templateUrl: './rmc-keypad.component.html',
  styleUrls: ['./rmc-keypad.component.less']
})
export class RmcKeypadComponent implements OnInit {
  pincode;
  @Output() onSubmit = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter();

  keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  constructor() { }

  ngOnInit() {
    if (!this.pincode) { this.pincode = ''; }
  }

  onKeyPressed(data) {
    if (data === '<') {
      if (_.isEmpty(this.pincode)) {
        this.onCancel.emit();
      } else {
        this.pincode = this.pincode.slice(0, this.pincode.length - 1);
      }
    } else if (data === '>') {
      this.submitPin();
    } else {
      this.pincode += data;
    }
  }

  submitPin() {
    this.onSubmit.emit(this.pincode);
  }

}
