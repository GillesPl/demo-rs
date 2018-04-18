import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmcKeypadComponent } from './rmc-keypad.component';
import { NgKeypadComponent } from './ng-keypad/ng-keypad.component';
import { NgKeyComponent } from './ng-key/ng-key.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ RmcKeypadComponent, NgKeyComponent, NgKeypadComponent ],
  exports: [ RmcKeypadComponent ]
})
export class KeypadModule { }
