import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { ApiService } from '../../../api.service';
import * as _ from 'lodash';
import { CardService } from '../../card.service';
import { EventService } from '../../../event.service';
import { PteidService } from '../pteid.service';

@Component({
  selector: 'app-pteid-viz',
  templateUrl: './pteid-viz.component.html',
  styleUrls: ['./pteid-viz.component.less']
})
export class PteidVizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;

  certStatus;
  addressPinStatus;
  signPinStatus;
  photo;
  certData;
  loadingCerts;
  addressInfo;
  isCollapsed;

  constructor(private API: ApiService,
              private Connector: Connector,
              private cardService: CardService,
              private eventService: EventService,
              private pteid: PteidService) {
    this.eventService.addressPinCheckHandled$.subscribe((results) => this.handleAddressPinCheckResult(results));
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results));
  }

  ngOnInit() {
    const comp = this;
    comp.certStatus = 'checking';
    comp.addressPinStatus = 'idle';
    comp.signPinStatus = 'idle';

    // validate certificate chain
    comp.Connector.plugin('pteid', 'allCerts', [comp.readerId], [ { filter: [], parseCerts: false }]).then(res => {
      comp.API.convertJPEG2000toJPEG(comp.cardData.id.photo).toPromise().then((converted: any) => {
        comp.photo = converted.data.base64Pic;
      });

      const validationReq = {
        certificateChain: [
          { order: 0, certificate: res.data.authentication_certificate.base64 },
          { order: 1, certificate: res.data.root_authentication_certificate.base64 },
          { order: 2, certificate: res.data.root_certificate.base64 },
        ]
      };
      const validationReq2 = {
        certificateChain: [
          { order: 0, certificate: res.data.non_repudiation_certificate.base64 },
          { order: 1, certificate: res.data.root_non_repudiation_certificate.base64 },
          { order: 2, certificate: res.data.root_certificate.base64 },
        ]
      };
      const promises = [ comp.Connector.ocv('validateCertificateChain', [validationReq]),
        comp.Connector.ocv('validateCertificateChain', [validationReq2]) ];

      Promise.all(promises).then(results => {
        let status = 'valid';
        _.forEach(results, valRes => {
          if (!(valRes.crlResponse && valRes.crlResponse.status &&
            valRes.ocspResponse && valRes.ocspResponse.status)) { status = 'invalid'; }
        });
        comp.certStatus = status;
      });
    });
  }

  addressData() {
    // check address pin
    this.pteid.openAddressPinModalForReader(this.readerId);
  }

  handleAddressPinCheckResult(pinCheck) {
    this.addressPinStatus = CardService.determinePinModalResult(pinCheck, 'pteid');
  }

  checkPin() {
    this.cardService.openPinModalForReader(this.readerId);
  }

  handlePinCheckResult(pinCheck) {
    this.signPinStatus = CardService.determinePinModalResult(pinCheck, 'pteid');
  }

  toggleCerts() {
    const comp = this;
    // Analytics.trackEvent('button', 'click', 'Extended info clicked');
    if (!comp.isCollapsed) {
      // comp.certData = undefined;
      comp.isCollapsed = true;
    } else {
      if (!comp.loadingCerts) {
        comp.loadingCerts = true;
        comp.Connector.plugin('pteid', 'allCerts', [comp.readerId], [{ filter: [], parseCerts: false }]).then(res => {
          comp.loadingCerts = false;
          comp.certData = res.data;
          comp.isCollapsed = false;
        });
      }
    }
  }

  downloadSummary() {
    // Analytics.trackEvent('button', 'click', 'Print button clicked');
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/summary-download.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [controller.readerId]).then(res => {
    //         return res.data.pinpad;
    //       })
    //     },
    //     needPinToGenerate: () => {
    //       return false;
    //     },
    //     util: () => {
    //       return PtUtils;
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'SummaryDownloadCtrl',
    //   size: 'lg'
    // });
    //
    // modal.result.then(function () {
    //
    // }, function (err) {
    //
    // });
  }

  trackCertificatesClick() {
    // Analytics.trackEvent('button', 'click', 'Click on certificates feature');
  }

}
