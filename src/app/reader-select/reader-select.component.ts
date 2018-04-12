import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import * as _ from 'lodash';
import {CardService} from '../cards/card.service';

@Component({
  selector: 'app-reader-select',
  templateUrl: './reader-select.component.html',
  styleUrls: ['./reader-select.component.less']
})
export class ReaderSelectComponent implements OnInit {
  @Input() currentReaderId;
  readers;

  constructor(private cardService: CardService, private eventService: EventService) {
    this.eventService.readersWithCards$.subscribe(readers => this.onReadersWithCards(readers));
  }

  ngOnInit() {
    this.readers = [];
  }


  onReadersWithCards(readers) {
    console.log(readers);
    if (readers.data.length !== this.readers.lenth) {
      this.readers = readers.data;
      _.forEach(this.readers, reader => {
        this.cardService.detectCardTypeName(reader.id, reader.card).then(name => {
          reader.cardType = name;
        });
      });
    }
  }

}
