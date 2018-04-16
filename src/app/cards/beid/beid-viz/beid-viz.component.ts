import { Component, Input, OnInit } from '@angular/core';
import { Connector } from '../../../connector.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PinCheckModalComponent } from '../../pin-check-modal/pin-check-modal.component';
import { EventService } from '../../../event.service';

@Component({
  selector: 'app-beid-viz',
  templateUrl: './beid-viz.component.html',
  styleUrls: ['./beid-viz.component.less']
})
export class BeidVizComponent implements OnInit {
  @Input() rnData;
  @Input() addressData;
  @Input() picData;
  @Input() readerId;
  @Input() certData;

  certStatus;
  pinStatus;
  loadingCerts: boolean;
  isCollapsed = true;

  pinModalRef: BsModalRef;

  constructor(private Connector: Connector, private eventService: EventService, private modalService: BsModalService) {
    this.eventService.pinCheckRequested$.subscribe(() => this.checkPin());
    this.eventService.pinCheckHandled$.subscribe((results) => this.handlePinCheckResult(results));
  }

  ngOnInit() {
    const comp = this;

    this.certStatus = 'checking';
    this.pinStatus = 'idle';
    const filter = ['authentication-certificate', 'citizen-certificate', 'root-certificate'];
    comp.Connector.plugin('beid', 'allCerts', [comp.readerId], filter).then(res => {
      const validationReq = {
        certificateChain: [
          { order: 0, certificate: res.data.authentication_certificate.base64 },
          { order: 1, certificate: res.data.citizen_certificate.base64 },
          { order: 2, certificate: res.data.root_certificate.base64 },
        ]
      };
      // Analytics.trackEvent('beid', 'cert-check', 'Start certificate check');
      comp.Connector.ocv('validateCertificateChain', [validationReq]).then(validationRes => {
        if (validationRes.crlResponse && validationRes.crlResponse.status &&
          validationRes.ocspResponse && validationRes.ocspResponse.status) {
          // Analytics.trackEvent('beid', 'cert-valid', 'Certificates are valid');
          comp.certStatus = 'valid';
        } else {
          // Analytics.trackEvent('beid', 'cert-invalid', 'Certificates are not valid');
          comp.certStatus = 'invalid';
        }
      }, () => {
        // Analytics.trackEvent('beid', 'cert-error', 'Error occurred while checking certificate validity');
        comp.certStatus = 'error';
      });
    });
  }

  checkPin() {
    const comp = this;
    // Analytics.trackEvent('button', 'click', 'PIN check clicked');

    this.Connector.core('reader', [comp.readerId]).then(res => {
      const initialState = {
        readerId: comp.readerId,
        pinpad: res.data.pinpad
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      comp.pinModalRef = comp.modalService.show(PinCheckModalComponent, config);
    });
  }

  handlePinCheckResult(pinCheck) {
    // check if the request was cancelled, if it was, we don't need to do anything
    if (!pinCheck.cancelled) {
      if (pinCheck.error) {
        // Analytics.trackEvent('beid', 'pin-incorrect', 'Incorrect PIN entered');
        switch (pinCheck.result.code) {
          case 103:
            this.pinStatus = '2remain';
            break;
          case 104:
            this.pinStatus = '1remain';
            break;
          case 105:
            // Analytics.trackEvent('beid', 'pin-blocked', 'Card blocked; too many incorrect attempts');
            this.pinStatus = 'blocked';
            break;
          case 109:
            // cancelled on reader
            this.pinStatus = 'cancelled';
            break;
        }
      } else {
        // Analytics.trackEvent('beid', 'pin-correct', 'Correct PIN entered');
        this.pinStatus = 'valid';
      }
    }
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
        comp.Connector.plugin('beid', 'allCerts', [comp.readerId]).then(res => {
          comp.loadingCerts = false;
          comp.certData = res.data;
          comp.isCollapsed = false;
        });
      }
    }
  }

  downloadSummary() {
    console.log('print function called');
    const comp = this;
    // // Analytics.trackEvent('button', 'click', 'Print button clicked');
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/summary-download.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [comp.readerId]).then((res) => {
    //         return res.data.pinpad;
    //       });
    //     },
    //     needPinToGenerate: () => {
    //       return false;
    //     },
    //     util: () => {
    //       return BeUtils;
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
