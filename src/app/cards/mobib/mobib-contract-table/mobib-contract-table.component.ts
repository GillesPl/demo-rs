import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobib-contract-table',
  templateUrl: './mobib-contract-table.component.html',
  styleUrls: ['./mobib-contract-table.component.less']
})
export class MobibContractTableComponent implements OnInit {
  @Input() contracts;

  constructor() { }

  ngOnInit() {

  }

}
