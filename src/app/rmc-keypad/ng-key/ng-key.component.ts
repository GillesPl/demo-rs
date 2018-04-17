import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ng-key',
  templateUrl: './ng-key.component.html',
  styleUrls: ['./ng-key.component.less']
})
export class NgKeyComponent implements OnInit {
  @Input() ngKeyData;
  @Input() keyClass;
  @Output() keyPressed = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  keyPress() {
    this.keyPressed.emit(this.ngKeyData);
  }

}
