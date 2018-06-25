import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-exchange-file-view',
  templateUrl: './file-exchange-file-view.component.html',
  styleUrls: ['./file-exchange-file-view.component.less']
})
export class FileExchangeFileViewComponent implements OnInit {
  @Input() selectedFile;

  constructor() {
  }

  ngOnInit() {
  }
}
