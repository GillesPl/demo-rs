import {Component, OnInit} from '@angular/core';
import {EventService} from '../../event.service';
import {Connector} from '../../connector.service';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

@Component({
  selector: 'app-generate-key-pair',
  templateUrl: './generate-key-pair.component.html',
  styleUrls: ['./generate-key-pair.component.less']
})
export class GenerateKeyPairComponent implements OnInit {
  
  keyPairData: GenerateKeyPairData = new GenerateKeyPairData('','','');

  constructor(private conn: Connector, private eventService: EventService) {
    this.eventService.javaKeyToolOpened$.subscribe(() => this.getData());
  }

  ngOnInit(): void {
  }

  getData() {
    console.log('getdata')
  }

  createKeyPair() {
    if (this.keyPairData.entity != '' && this.keyPairData.type != '' && this.keyPairData.keystore != '') {

      this.conn.plugin('JavaKeyTool', 'generateKeyPair', [], [this.keyPairData]).then(res => {
        console.log(res)
      })
    }

  }

}

export class GenerateKeyPairData {
  constructor(
    public entity: string,
    public type: string,
    public keystore: string,
    public alias?: string,
    public keyalg?: string,
    public sigalg?: string,
    public destalias?: string,
    public dname?: string,
    public startdate?: string,
    public ext?: string,
    public validity?: number,
    public keypass?: string,
    public storepass?: string,
    public storetype?: string,
    public providername?: string,
    public providerclass?: string,
    public providerarg?: string,
    public providerpath?: string
  ) {}
}
