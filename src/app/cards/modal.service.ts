import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Connector } from '../connector.service';
import { Angulartics2 } from 'angulartics2';

@Injectable()
export class ModalService {

  constructor(private angulartics2: Angulartics2, private Connector: Connector, private modalService: BsModalService) { }


}
