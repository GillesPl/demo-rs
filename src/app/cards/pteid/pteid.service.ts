import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ApiService } from '../../api.service';
import { Connector } from '../../connector.service';
import { HttpClient } from '@angular/common/http';
import { PteidAddressPinCheckStatusComponent } from './pteid-address-pin-check-status/pteid-address-pin-check-status.component';
import { BsModalService } from 'ngx-bootstrap';

@Injectable()
export class PteidService {

  constructor(private API: ApiService,
              private Connector: Connector,
              private http: HttpClient,
              private modalService: BsModalService) { }

  generateSummaryToSign(readerId) {
    const service = this;
    return service.Connector.plugin('pteid', 'idData', [readerId], []).then(idData => {
      return service.API.convertJPEG2000toJPEG(idData.data.photo).toPromise().then((photo: any) => {
        const documentNumberComponents = _.split(idData.data.document_number, ' ');
        const summaryData = {
          idData: idData.data,
          photo: photo.data.base64Pic,
          printDate: moment().format('MMMM D, YYYY'),
          printedBy: '@@name v@@version',
          docNumberPart1: _.pullAt(documentNumberComponents, 0)[0],
          docNumberPart2: _.join(documentNumberComponents, ' ')
        };

        return service.http.post('api/cards/pt/summarytosign', summaryData).toPromise().then(function (res: any) {
          return res.data;
        });
      });
    });
  }

  address(readerId, pin) {
    // Mock data preserved for reference
    // console.log(readerId);
    // console.log(pin);
    // return $q.when({
    //     data: {
    //         abbr_building_type: "",
    //         abbr_street_type: "AV",
    //         building_type: "",
    //         civil_parish: "110623",
    //         civil_parish_description: "Nossa Senhora de Fátima",
    //         district: "11",
    //         district_description: "Lisboa",
    //         door_no: "202",
    //         floor: "",
    //         gen_address_num: "200801",
    //         is_national: true,
    //         locality: "Lisboa",
    //         municipality: "1106",
    //         municipality_description: "Lisboa",
    //         place: "",
    //         postal_locality: "LISBOA",
    //         raw_data: "TgBQVAAAMTEAAExpc2JvYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTA2AAAAAExpc2JvYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTA2MjMAAAAAAABOb3NzYSBTZW5ob3JhIGRlIEbDoXRpbWEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQVYAAAAAAAAAAAAAAAAAAAAAAABBdmVuaWRhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANSBkZSBPdXR1YnJvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMDIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExpc2JvYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMDUwAAAAADA2NQAAAExJU0JPQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwODAxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    //         side: "",
    //         street_name: "5 de Outubro",
    //         street_type: "Avenida",
    //         type: "N",
    //         zip3: "065",
    //         zip4: "1050"
    //     },
    //     success: true
    // });
    return this.Connector.plugin('pteid', 'address', [readerId], [{ pin }]);
  }

  openAddressPinModalForReader(readerId) {
    const svc = this;
    // Analytics.trackEvent('button', 'click', 'PIN check clicked');

    this.Connector.core('reader', [readerId]).then(res => {
      const initialState = {
        readerId,
        pinpad: res.data.pinpad
      };
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState
      };
      svc.modalService.show(PteidAddressPinCheckStatusComponent, config);
    });
  }

}
