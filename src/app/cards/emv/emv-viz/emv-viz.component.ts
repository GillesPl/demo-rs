import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-emv-viz',
  templateUrl: './emv-viz.component.html',
  styleUrls: ['./emv-viz.component.less']
})
export class EmvVizComponent implements OnInit {
  @Input() data;
  @Input() readerId;

  pinStatus;

  constructor() { }

  ngOnInit() {
    this.pinStatus = 'idle';
  }

  checkPin() {
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/check-pin.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.get().core().reader(controller.readerId).then(res => {
    //         return res.data.pinpad;
    //       })
    //     },
    //     plugin: () => {
    //
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'ModalPinCheckCtrl'
    // });
    //
    // modal.result.then(function () {
    //   controller.pinStatus = 'valid';
    // }, function (err) {
    //   switch (err.code) {
    //     case 103:
    //       controller.pinStatus = '2remain';
    //       break;
    //     case 104:
    //       controller.pinStatus = '1remain';
    //       break;
    //     case 105:
    //       Analytics.trackEvent('beid', 'pin-blocked', 'Card blocked; too many incorrect attempts');
    //       controller.pinStatus = 'blocked';
    //       break;
    //   }
    // });
  }
}
