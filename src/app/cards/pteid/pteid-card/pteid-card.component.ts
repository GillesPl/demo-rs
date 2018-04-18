import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-pteid-card',
  templateUrl: './pteid-card.component.html',
  styleUrls: ['./pteid-card.component.less']
})
export class PteidCardComponent implements OnInit {
  @Input() idData;
  @Input() photo;

  docNumberPart1;
  docNumberPart2;

  constructor() { }

  ngOnInit() {
    const documentNumberComponents = _.split(this.idData.document_number, ' ');
    this.docNumberPart1 = _.pullAt(documentNumberComponents, 0)[0];
    this.docNumberPart2 = _.join(documentNumberComponents, ' ');
  }

}
