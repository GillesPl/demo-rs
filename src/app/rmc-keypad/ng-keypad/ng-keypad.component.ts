import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-keypad',
  templateUrl: './ng-keypad.component.html',
  styleUrls: ['./ng-keypad.component.less']
})
export class NgKeypadComponent implements OnInit {
  @Input() onKeyPressed;

  constructor() { }

  ngOnInit() {
  }

}
