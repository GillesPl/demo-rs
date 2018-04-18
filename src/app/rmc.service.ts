import { Injectable } from '@angular/core';
import {Connector} from './connector.service';
import * as _ from 'lodash';
import {EventService} from './event.service';

@Injectable()
export class RMC {

  constructor(private Connector: Connector, private eventService: EventService) { }

  monitorCardRemoval(readerId, card) {
    const service = this;
    setTimeout(() => {
      this.checkCardRemoval(readerId, card).then(function (removed) {
        if (removed) {
          service.eventService.startOver();
        } else {
          service.monitorCardRemoval(readerId, card);
        }
      });
    }, 500);
  }

  checkCardRemoval(readerId?, card?) {
    const service = this;
    // Check reader still connected
    // Check card still inserted
    // Check same card inserted
    return new Promise((resolve) => {
      setTimeout(function() {
        resolve(service.Connector.core('readersCardAvailable').then(function (readerData) {
          service.eventService.readersWithCards(readerData);
          if (!_.has(readerData, 'data') || _.isEmpty(readerData.data)) {
            // no connected readers with cards
            // removal is true
            return true;
          } else {
            // check if readerId still present
            const reader = _.find(readerData.data, (rd) => {
              return rd.id === readerId;
            });
            // check if card with same atr is present
            // TODO deeper check to see if it is really the same card and not just a card of same type?
            return !(reader && reader.card && reader.card.atr === card.atr);
          }
        }, function () {
          // console.log('error occurred, assume card removed');
          return true;
        }));
      }, 500);
    });
  }

  checkReaderRemoval() {
    const service = this;
    // check reader still connected
    return service.Connector.core('readers').then(function (readerData) {
      if (!_.has(readerData, 'data') || _.isEmpty(readerData.data)) {
        // no connected readers
        // broadcast removal event
        service.eventService.startOver();
        return true;
      } else {
        return false;
      }
    }, function (error) {
      if (error.message === 'Network Error') {
        // try again after short delay
        setTimeout(function () {
          return service.checkCardRemoval();
        }, 100);
      }
    });
  }
}
