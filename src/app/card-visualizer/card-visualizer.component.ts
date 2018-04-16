import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventService} from '../event.service';
import {ApiService} from '../api.service';
import {Connector} from '../connector.service';
import {CardService} from '../cards/card.service';
import {RMC} from '../rmc.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-card-visualizer',
  templateUrl: './card-visualizer.component.html',
  styleUrls: ['./card-visualizer.component.less']
})
export class CardVisualizerComponent implements OnChanges, OnInit {
  @Input() readerId;
  currentReaderId = this.readerId;
  loading: boolean;
  errorReadingCard: boolean;
  unknownCard: boolean;
  submitted: boolean;
  card;
  cardData;
  cardType: string;
  cardTypePretty: string;
  cardDesc: string


  constructor(private API: ApiService, private cardService: CardService,
              private Connector: Connector, private eventService: EventService, private RMC: RMC) {
    this.eventService.reinitialize$.subscribe(() => {
      // re-execute init when reinitialize event is received
      this.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('input changed');
    if (changes.readerId && changes.readerId.currentValue !== this.currentReaderId) {
      // store new ID for future checks
      this.currentReaderId = changes.readerId.currentValue;
      // Reader ID has changed, we need to reinitialize the view
      this.ngOnInit();
    }
  }

  ngOnInit() {
    const component = this;

    this.loading = true;
    this.errorReadingCard = false;
    this.unknownCard = false;
    // Detect Type and read data
    component.Connector.core('reader', [component.readerId]).then(readerInfo => {
      component.cardService.detectContainer(readerInfo.data.id).then(type => {
        component.cardType = type;
        component.cardTypePretty = component.cardService.getCardTypeName(type, readerInfo.data.card);
        component.card = readerInfo.data.card;

        if (component.cardType === 'unknown') {
          component.unknownCard = true;
          component.loading = false;
          component.RMC.monitorCardRemoval(component.readerId, component.card);
        } else if (_.includes(['luxeid', 'piv'], type)) {
          // Special handling for luxeid and PIV
          setTimeout(() => {
            component.loading = false;
          });
          component.RMC.monitorCardRemoval(component.readerId, component.card);
        } else {
          // Other cards use generic dumpData method
          component.Connector.generic('dumpData', [readerInfo.data.id]).then(res => {
            component.cardData = res.data;
            component.loading = false;
            component.RMC.monitorCardRemoval(component.readerId, component.card);
          }, function (error) {
            console.log(error);
            if (error.status === 412 && (error.data.code === 900 || error.data.code === 0)) {
              // this usually means the card was removed during reading, check if it is still present
              component.RMC.checkCardRemoval(component.readerId, component.card).then(function (removed) {
                if (removed) {
                  component.eventService.startOver();
                }
                component.ngOnInit();
              });
            } else {
              component.errorReadingCard = true;
              component.loading = false;
              component.RMC.monitorCardRemoval(component.readerId, component.card);
            }
          });
        }
      }).catch(err => {
        console.log(err);
        component.unknownCard = true;
        component.loading = false;
        component.RMC.monitorCardRemoval(component.readerId, readerInfo.data.card);
      });
    }, function (error) {
      if (error.message === 'Network Error') {
        // try again after short delay
        setTimeout(function () {
          component.ngOnInit();
        }, 100);
      } else {
        // fire event to restart
        component.eventService.startOver();
      }
    });

  }

  readAnother() {
    this.eventService.startOver(this.readerId);
  }

  registerUnknownType(cardDescription) {
    this.submitted = true;
    this.API.storeUnknownCardInfo(this.card, cardDescription);
  }

  showSupportedCardTypes() {
    this.eventService.openSidebar();
  }
}
