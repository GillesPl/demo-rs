import {Component, Input, OnInit} from '@angular/core';
import {Connector} from '../connector.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.less']
})
export class LogViewerComponent implements OnInit {
  @Input() logfileName;
  logContents;
  autoScroll: boolean;

  constructor(private Connector: Connector) { }

  ngOnInit() { this.getData(); }

  autoScrollChanged() {
    if (this.autoScroll) { this.doAutoScroll(); }
  }

  doAutoScroll() {
    // TODO implementation
    // get textarea element
    const textareaId = 'log-' + this.logfileName;
    const element = document.getElementById(textareaId);
    // get latest data;
    this.getData().then(() => {
      // scroll textarea to bottom;
      setTimeout(() => {
        if (element) {
          element.scrollTop = element.scrollHeight;
        }
      }, 0);
    });

    // set timeout to recheck
    setTimeout(() => {
      // only attempt to scroll if the element and controller have not been destroyed
      if (element && this && this.autoScroll) { this.doAutoScroll(); }
    }, 2000);

  }

  getData() {
    // Get logfile blob from connector
    return this.Connector.plugin('admin', 'getLogfile', [], [this.logfileName]).then(res => {
      const blb = res.data;
      const reader = new FileReader();

      // This fires after the blob has been read/loaded.
      reader.addEventListener('loadend', (e) => {
        const readResult: FileReader = e.srcElement as any;
        this.logContents = readResult.result;
      });

      // Start reading the blob as text.
      reader.readAsText(blb);
    });
  }
}
