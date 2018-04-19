import { Component, OnInit } from '@angular/core';
import {Connector} from './connector.service';
import * as _ from 'lodash';
import {EventService} from './event.service';
import {RMC} from './rmc.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2 } from 'angulartics2';
import { CitrixService } from './citrix.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';
  gclAvailable: boolean;
  gclChecked: boolean;
  readers: any;
  cardPresent: boolean;
  isFirefox: boolean;
  pollingReaders: boolean;
  pollingCard: boolean;
  adminPanelOpen: boolean;
  cardTypesOpen: boolean;
  faqOpen: boolean;
  error: boolean;
  pollTimeout: boolean;
  dlLink: string;
  readerWithCard: boolean;
  hover: boolean;
  noConsent: boolean;
  downloadError: boolean;

  private pollIterations = 0;

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              private angulartics2: Angulartics2,
              private Citrix: CitrixService,
              private Connector: Connector,
              private eventService: EventService,
              private RMC: RMC) {
    this.eventService.adminPanelOpened$.subscribe(() => this.onAdminPanelOpened());
    this.eventService.consentError$.subscribe(() => this.onConsentError());
    this.eventService.faqOpened$.subscribe(() => this.onFaqOpened());
    this.eventService.gclInstalled$.subscribe(() => this.onGclInstalled());
    this.eventService.readerSelected$.subscribe(item => this.onReaderSelected(item));
    this.eventService.retryCard$.subscribe(() => this.onRetryCard());
    this.eventService.retryReader$.subscribe(() => this.onRetryReader());
    this.eventService.sidebarOpened$.subscribe(() => this.onSidebarOpened());
    this.eventService.startOver$.subscribe(() => this.onStartOver());
  }

  ngOnInit() {
    const comp = this;

    comp.Connector.init(this.Connector.generateConfig()).then(() => {
      comp.gclChecked = true;
      comp.gclAvailable = true;

      comp.Connector.core('version').then(version => {
        console.log('Using T1C-JS ' + version);
      });
      comp.Connector.core('info').then(info => {
        console.log('GCL version installed: ' + info.data.version);
      });


      // Check if we need to do citrix init
      comp.citrixInit().then(() => {
        // Determine initial action we need to take
        comp.Connector.core('readers').then(readers => {
          comp.readers = readers.data;
          if (_.isEmpty(readers.data)) {
            // No readers present, poll for readers being connected
            comp.pollForReaders();
          } else {
            // Is there a card in at least one reader?
            comp.cardPresent = !!_.find(readers.data, r => {
              return _.has(r, 'card');
            });
            if (comp.cardPresent) {
              // A card is present, determine type and read its data
              comp.readCard();
            } else {
              // No card found, polling
              comp.pollForCard();
            }
          }
        });
      });
    }, err => {
      if (err.code === '903') {
        this.onDownloadError();
      } else {
        // assume gcl unavailable
        console.log('No GCL installation found');
        this.gclChecked = true;
        this.gclAvailable = false;
        this.promptDownload();
      }
    });

    this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }

  citrixInit() {
    const comp = this;
    return new Promise((resolve) => {
      // check if we are in citrix environment
      comp.Connector.core('info').then(info => {
        // check citrix flag
        if (_.isBoolean(info.data.citrix) && info.data.citrix) {
          // set to citrix environment
          comp.Citrix.environment(info.data.citrix);
          // check if username or other parameters are set in the local storage
          comp.Citrix.checkUserName().then(() => {
            // determine agent port to use
            resolve(comp.determineAgentPort());
          });
        } else {
          // not in citrix environment, resolve the promise
          resolve();
        }
      });
    });
  }

  determineAgentPort() {
    const comp = this;
    // retrieve GCL info
    return new Promise((resolve) => {
      // get agent filtering params
      const params = comp.Citrix.userSelectionParams();
      // get filtered agent list
      comp.Connector.plugin('agent', 'get', [], [params]).then(res => {
        // check if matching agents was found
        if (res.data && typeof res.data === 'object' && !_.isArray(res.data)) {
          // Save the agent and reinitialize the connector with agent port!
          comp.Citrix.agent(res.data).then(() => {
            // check if all is well
            comp.Connector.core('readers').then(() => {
              comp.Citrix.updateLocation();
              resolve(true);
            }, (err) => {
              // check if the error was intercepted by the consent handler for missing consent
              if (!err.noConsent) {
                comp.Citrix.invalidLocalAgent().then(() => {
                  resolve(comp.determineAgentPort());
                });
              }
            });
          });
        } else {
          // no agent found, or too many agents matching, prompt again
          comp.Citrix.invalidLocalAgent().then(() => {
            resolve(comp.determineAgentPort());
          });
        }
      }, err => {
        console.log(err);
      });
    });
  }

  dismissPanels() {
    this.eventService.closeSidebar();
    this.eventService.closeAdminPanel();
    this.cardTypesOpen = false;
    this.faqOpen = false;
  }

  refreshAdminData() {
    this.eventService.refreshAdminData();
  }

  // Event handlers
  onConsentError() {
    this.readerWithCard = false;
    this.gclChecked = false;
    this.pollingReaders = false;
    this.pollingCard = false;
    this.downloadError = false;
    this.noConsent = true;
  }

  onDownloadError() {
    this.readerWithCard = false;
    this.gclChecked = false;
    this.pollingReaders = false;
    this.pollingCard = false;
    this.downloadError = true;
    this.noConsent = false;
  }

  onReaderSelected(item) {
    this.readerWithCard = item;
  }

  onGclInstalled() {
    this.angulartics2.eventTrack.next({
      action: 'install',
      properties: { category: 'T1C', label: 'Trust1Connector installed'}
    });
    // reinit to load GCL config
    this.ngOnInit();
  }

  onSidebarOpened() {
    // Make sure the FAQ panel is closed when opening sidebar
    if (!this.cardTypesOpen) {
      this.faqOpen = false;
      this.eventService.closeAdminPanel();
      this.adminPanelOpen = false;
    }
    this.cardTypesOpen = !this.cardTypesOpen;
  }

  onAdminPanelOpened() {
    if (!this.adminPanelOpen) {
      this.faqOpen = false;
      this.eventService.closeSidebar();
      this.cardTypesOpen = false;

    }
    this.adminPanelOpen = !this.adminPanelOpen;
  }

  onFaqOpened() {
    // Make sure the side panel is closed when opening FAQ
    if (!this.faqOpen) {
      this.eventService.closeSidebar();
      this.eventService.closeAdminPanel();
      this.cardTypesOpen = false;
      this.adminPanelOpen = false;

    }
    this.faqOpen = !this.faqOpen;
  }

  onStartOver() {
    const controller = this;
    this.Connector.core('readers').then(result => {
      controller.readers = result.data;
      if (_.find(result.data, function (reader) {
        return _.has(reader, 'card');
      })) {
        controller.readCard();
      } else {
        controller.readers = result.data;
        controller.readerWithCard = undefined;
        controller.cardPresent = false;
        if (_.isEmpty(controller.readers)) {
          controller.pollForReaders();
        } else {
          controller.pollForCard();
        }
      }
    }, function () {
      controller.readers = [];
      controller.readerWithCard = undefined;
      controller.cardPresent = false;
      controller.pollForReaders();
    });
  }

  onRetryReader() {
    this.readerWithCard = undefined;
    this.cardPresent = false;
    this.pollForReaders();
  }

  onRetryCard() {
    this.readers = [];
    this.readerWithCard = undefined;
    this.cardPresent = false;
    this.pollForCard();
  }


  pollForReaders() {
    const controller = this;
    if (!this.pollingReaders) { this.pollingReaders = true; }
    this.error = false;
    this.Connector.core('pollReaders', [30, function (err, result) {
      // Success callback
      // Found at least one reader, poll for cards
      if (err) {
        controller.error = true;
      } else {
        controller.readers = result.data;
        controller.pollingReaders = false;
        controller.angulartics2.eventTrack.next({
          action: 'connect',
          properties: { category: 'reader', label: 'Reader connected: ' + _.join(_.map(controller.readers, 'name'), ',')}
        });
        controller.pollForCard();
      }
    }, function () {
      // Not used
    }, function () {
      // timeout, poll again
      controller.pollForReaders();
    }]);
  }

  pollForCard() {
    const controller = this;
    if (!controller.pollingCard) { controller.pollingCard = true; }
    controller.error = false;
    this.Connector.core('pollCardInserted', [3, function (err, result) {
      // Success callback
      // controller.readers = result.data;
      if (err) {
        controller.error = true;
      } else {
        controller.pollingCard = false;
        controller.pollTimeout = false;
        controller.angulartics2.eventTrack.next({
          action: 'insert',
          properties: { category: 'card', label: 'Card inserted: ' + result.card.atr }
        });
        controller.pollIterations = 0;
        // Found a card, attempt to read it
        // Refresh reader list first
        controller.Connector.core('readers').then(readerResult => {
          controller.readers = readerResult.data;
          controller.readCard();
        }, function () {
          controller.pollForCard();
        });
      }
    }, function () {
      // "Waiting for reader connection" callback
    }, function () {
      // "Waiting for card" callback
    }, function () {
      // timeout
      controller.pollIterations++;
      // if enough time has passed, show the card not recognized message
      if (controller.pollIterations >= 5) { controller.pollTimeout = true; }
      controller.RMC.checkReaderRemoval().then(function (removed) {
        if (removed) {
          controller.pollingCard = false;
        } else {
          controller.pollForCard();
        }
      });
    }]);
  }

  promptDownload() {
    // Prompt for dl
    const controller = this;
    this.Connector.generic('download').then(res => {
      controller.dlLink = res.url;
    });
  }

  readCard() {
    this.readerWithCard = _.find(this.readers, function (o) {
      return _.has(o, 'card');
    });
  }
}
