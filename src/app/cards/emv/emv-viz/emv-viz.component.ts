import { Component, Input, OnInit } from '@angular/core';
import { CardService } from '../../card.service';
import { EventService } from '../../../event.service';

@Component({
  selector: 'app-emv-viz',
  templateUrl: './emv-viz.component.html',
  styleUrls: ['./emv-viz.component.less']
})
export class EmvVizComponent implements OnInit {
  @Input() data;
  @Input() readerId;

  pinStatus;

  constructor(private cardService: CardService, private eventService: EventService) {
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results));
  }

  ngOnInit() {
    this.pinStatus = 'idle';
  }

  checkPin() {
    this.cardService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.pinStatus = CardService.determinePinModalResult(pinCheck, 'emv');
  }
}
