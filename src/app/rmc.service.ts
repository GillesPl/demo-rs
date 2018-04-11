import { Injectable } from '@angular/core';
import {Connector} from './connector.service';
import * as _ from 'lodash';

@Injectable()
export class RMC {

  constructor(private Connector: Connector) { }

  // monitorCardRemoval(readerId, card) {
  //   $timeout(function () {
  //     checkCardRemoval(readerId, card).then(function (removed) {
  //       if (removed) $rootScope.$broadcast(EVENTS.START_OVER);
  //       else monitorCardRemoval(readerId, card);
  //     });
  //   }, 500);
  // }
  //
  // checkCardRemoval(readerId, card) {
  //   // Check reader still connected
  //   // Check card still inserted
  //   // Check same card inserted
  //   return $timeout(function() {
  //     return Connector.core('readersCardAvailable').then(function (readerData) {
  //       $rootScope.$broadcast(EVENTS.READERS_WITH_CARDS, readerData);
  //       if (!_.has(readerData, 'data') || _.isEmpty(readerData.data)) {
  //         // no connected readers with cards
  //         // removal is true
  //         return true;
  //       } else {
  //         // check if readerId still present
  //         let reader = _.find(readerData.data, function (reader) {
  //           return reader.id === readerId;
  //         });
  //         // check if card with same atr is present
  //         // TODO deeper check to see if it is really the same card and not just a card of same type?
  //         return !(reader && reader.card && reader.card.atr === card.atr);
  //       }
  //     }, function () {
  //       // console.log('error occurred, assume card removed');
  //       return true;
  //     });
  //   }, 500);
  // }
  //
  // checkReaderRemoval() {
  //   // check reader still connected
  //   return Connector.core('readers').then(function (readerData) {
  //     if (!_.has(readerData, 'data') || _.isEmpty(readerData.data)) {
  //       // no connected readers
  //       // broadcast removal event
  //       $rootScope.$broadcast(EVENTS.START_OVER);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }, function (error) {
  //     if (error.message === EVENTS.NETWORK_ERROR) {
  //       // try again after short delay
  //       $timeout(function () {
  //         return checkCardRemoval();
  //       }, 100);
  //     }
  //   });
  // }
}
