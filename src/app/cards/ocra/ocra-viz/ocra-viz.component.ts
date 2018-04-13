import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ocra-viz',
  templateUrl: './ocra-viz.component.html',
  styleUrls: ['./ocra-viz.component.less']
})
export class OcraVizComponent implements OnInit {
  @Input() cardData;
  @Input() readerId;

  formattedChallenge;
  otpResult: { challenge: string, counter: string };

  constructor() { }

  ngOnInit() {
  }

  challenge() {
    // let modal = $uibModal.open({
    //   templateUrl: "views/readmycards/modals/check-pin.html",
    //   resolve: {
    //     readerId: () => {
    //       return controller.readerId
    //     },
    //     pinpad: () => {
    //       return Connector.core('reader', [controller.readerId]).then(res => {
    //         return res.data.pinpad;
    //       })
    //     }
    //   },
    //   backdrop: 'static',
    //   controller: 'ModalChallengeCtrl'
    // });
    //
    // modal.result.then(function (res) {
    //   controller.pinStatus = undefined;
    //   controller.otpResult = res.data;
    //   let toString = _.padStart(res.data.toString(), 8, '0');
    //   controller.formattedChallenge = toString.substr(0,4) + ' ' +toString.substr(4,4);
    // }, function (err) {
    //   switch (err.code) {
    //     case 111:
    //       controller.pinStatus = 'Wrong PIN entered; 4 tries remaining.';
    //       break;
    //     case 112:
    //       controller.pinStatus = 'Wrong PIN entered; 3 tries remaining.';
    //       break;
    //     case 103:
    //       controller.pinStatus = 'Wrong PIN entered; 2 tries remaining.';
    //       break;
    //     case 104:
    //       controller.pinStatus = 'Wrong PIN entered; 1 try remaining!';
    //       break;
    //     case 105:
    //       controller.pinStatus = '5 invalid PINs entered. Card blocked';
    //       break;
    //   }
    // });
  }
}
