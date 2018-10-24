import { Injectable } from '@angular/core';
import {Connector} from '../connector.service';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import { Angulartics2 } from 'angulartics2';

@Injectable()
export class CardService {

  constructor(private angulartics2: Angulartics2,
              private Connector: Connector,
              private http: HttpClient) {}

  determinePinModalResult(pinCheck, cardType) {
    // check if the request was cancelled, if it was, we don't need to do anything
    if (!pinCheck.cancelled) {
      if (pinCheck.error) {
        this.angulartics2.eventTrack.next({ action: 'pin-incorrect', properties: { category: cardType, label: 'Incorrect PIN entered'} });
        switch (pinCheck.result.code) {
          case 111:
            return '4remain';
          case 112:
            return '3remain';
          case 103:
            return '2remain';
          case 104:
            return '1remain';
          case 105:
            this.angulartics2.eventTrack.next({ action: 'pin-blocked',
              properties: { category: cardType, label: 'Card blocked; too many incorrect attempts'} });
            return 'blocked';
          case 106:
            return 'error';
          case 109:
            // cancelled on reader
            return 'cancelled';
        }
      } else {
        this.angulartics2.eventTrack.next({ action: 'pin-correct', properties: { category: cardType, label: 'Correct PIN entered'} });
        return 'valid';
      }
    }
  }

  detectContainer(readerId) {
    return this.Connector.get().containerFor(readerId).then(res => {
      // change result for unsupported card types
      if (res.data === 'aventra') { return 'unknown'; }
      return res.data;
    });
  }

  detectCardTypeName(readerId, card) {
    return this.detectContainer(readerId).then(container => {
      return this.getCardTypeName(container, card);
    });
  }

  determineType(readerId, pin) {
    return this.detectContainer(readerId).then(container => {
      return { readerId, container, pin };
    });
  }

  getCardTypeName(container, card) {
    switch (container) {
      case 'beid':
        return 'Belgian eID';
      case 'dnie':
        return 'Spanish DNIe';
      case 'emv':
        return 'EMV';
      case 'luxeid':
        return 'Luxembourgish eID';
      case 'luxtrust':
        return 'LuxTrust';
      case 'ocra':
        return 'OCRA/OTP';
      case 'mobib':
        if (findDescription(card.description, 'Basic')) {
          return 'MoBIB Basic';
        } else {
          return 'MoBIB';
        }
      case 'oberthur':
        return 'Oberthur';
      case 'piv':
        return 'PIV';
      case 'pkcs11':
        return 'PKCS11 Compatible';
      case 'pteid':
        return 'Portuguese eID';
      default:
        return 'Unknown';
    }

    function findDescription(descriptions, toFind) {
      return !!_.find(descriptions, desc => {
        return desc.indexOf(toFind) > -1;
      });
    }
  }


  getCertificatesForSigning(readerId, container, pin) {
    const service = this;
    // Based on type of card, retrieve certificates
    // return object with certificate array and sign certificate
    switch (container) {
      case 'aventra':
        return service.getAventraCertificates(readerId);
      case 'beid':
        return service.getBeIDCertificates(readerId);
      case 'dnie':
        return service.getDNIeCertificates(readerId);
      case 'luxeid':
        return service.getLuxIDCertificates(readerId, pin);
      case 'luxtrust':
        return service.getLuxTrustCertificates(readerId);
      case 'oberthur':
        return service.getOberthurCertificates(readerId);
      case 'piv':
        return service.getPIVCertificates(readerId);
      case 'pteid':
        return service.getPtEidCertificates(readerId);
      default:
        return Promise.reject('Cannot retrieve certificates');
    }
  }

  getAventraCertificates(readerId) {
    return this.Connector.get().aventra(readerId)
      .allCerts(['root-certificate', 'authentication-certificate', 'signing-certificate']).then(certs => {
        return {
          digestAlgoWrapper: 'SHA512',
          certificates:    [ certs.data.signing_certificate.base64,
            certs.data.authentication_certificate.base64,
            certs.data.root_certificate.base64 ],
          signCertificate: certs.data.signing_certificate.base64
        };
      });
  }

  getBeIDCertificates(readerId) {
    return this.Connector.get().beid(readerId)
      .allCerts(['root-certificate', 'citizen-certificate', 'non-repudiation-certificate']).then(certs => {
        return {
          digestAlgoWrapper: 'SHA512',
          certificates:    [ certs.data.non_repudiation_certificate.base64,
            certs.data.citizen_certificate.base64,
            certs.data.root_certificate.base64 ],
          signCertificate: certs.data.non_repudiation_certificate.base64
        };
      });
  }

  getDNIeCertificates(readerId) {
    return this.Connector.get().dnie(readerId)
      .allCerts(['intermediate-certificate', 'authentication-certificate', 'signing-certificate']).then(certs => {
        return {
          digestAlgoWrapper: 'SHA512',
          certificates:    [ certs.data.signing_certificate.base64,
            certs.data.authentication_certificate.base64,
            certs.data.intermediate_certificate.base64 ],
          signCertificate: certs.data.signing_certificate.base64
        };
      });
  }

  getLuxIDCertificates(readerId, pin) {
    return this.Connector.get().luxeid(readerId, pin)
      .allCerts({ filter: ['root-certificates', 'non-repudiation-certificate'] }).then(certs => {
        return {
          digestAlgoWrapper: 'SHA256',
          certificates:    [ certs.data.non_repudiation_certificate.base64,
            certs.data.root_certificates[1].base64,
            certs.data.root_certificates[0].base64 ],
          signCertificate: certs.data.non_repudiation_certificate.base64
        };
      });
  }

  getLuxTrustCertificates(readerId) {
    return this.Connector.get().luxtrust(readerId)
      .allCerts({ filter: ['root-certificates', 'signing-certificate'] }).then(certs => {
        return {
          digestAlgoWrapper: 'SHA256',
          certificates:    [ certs.data.signing_certificate.base64,
            certs.data.root_certificates[1].base64,
            certs.data.root_certificates[0].base64 ],
          signCertificate: certs.data.signing_certificate.base64
        };
      });
  }

  getOberthurCertificates(readerId) {
    return this.Connector.get().oberthur(readerId)
      .allCerts({ filter: ['root-certificate', 'authentication-certificate', 'signing-certificate'] }).then(certs => {
        return {
          digestAlgoWrapper: 'SHA256',
          certificates:    [ certs.data.signing_certificate.base64,
            certs.data.authentication_certificate.base64,
            certs.data.root_certificate.base64 ],
          signCertificate: certs.data.signing_certificate.base64
        };
      });
  }

  getPIVCertificates(readerId) {
    return this.Connector.get().piv(readerId)
      .allCerts({ filter: ['authentication-certificate', 'signing-certificate'] }).then(certs => {
        return {
          digestAlgoWrapper: 'SHA512',
          certificates:    [ certs.data.signing_certificate.base64,
            certs.data.authentication_certificate.base64 ],
          signCertificate: certs.data.signing_certificate.base64
        };
      });
  }

  getPtEidCertificates(readerId) {
    return this.Connector.get().pteid(readerId)
      .allCerts({ filter: ['root_certificate', 'root_non_repudiation_certificate', 'non_repudiation_certificate'] }).then(certs => {
        return {
          digestAlgoWrapper: 'SHA256',
          certificates:    [ certs.data.non_repudiation_certificate.base64,
            certs.data.root_non_repudiation_certificate.base64,
            certs.data.root_certificate.base64 ],
          signCertificate: certs.data.non_repudiation_certificate.base64
        };
      });
  }

  getDataForType(args) {
    return this.getCertificatesForSigning(args.readerId, args.container, args.pin).then(certs => {
      return this.getSignerName(args.readerId, args.container, args.pin).then(name => {
        certs.additionalInformation = { name };
        return certs;
      });
    });
  }

  getSignerName(readerId, container, pin) {
    const service = this;
    // Based on type of card, retrieve certificates
    // return object with certificate array and sign certificate
    switch (container) {
      case 'aventra':
        return service.getAventraSigner();
      case 'beid':
        return service.getBeIDSigner(readerId);
      case 'dnie':
        return service.getDNIeSigner(readerId);
      case 'luxeid':
        return service.getLuxIDSigner(readerId, pin);
      case 'luxtrust':
        return service.getLuxTrustSigner();
      case 'oberthur':
        return service.getOberthurSigner();
      case 'piv':
        return service.getPIVSigner(readerId, pin);
      case 'pteid':
        return service.getPtEidSigner(readerId);
      default:
        return Promise.reject('Cannot retrieve certificates');
    }
  }

  getAventraSigner() {
    // TODO retrieve name from signing certificate?
    return Promise.resolve('Signed with Aventra card');
  }

  getBeIDSigner(readerId) {
    return this.Connector.get().beid(readerId).rnData().then(rnData => {
      return rnData.data.first_names.split(' ', 1) + ' ' + rnData.data.name;
    });
  }

  getDNIeSigner(readerId) {
    return this.Connector.get().dnie(readerId).info().then(info => {
      return info.data.firstName + ' ' + info.data.firstLastName;
    });
  }

  getLuxIDSigner(readerId, pin) {
    return this.Connector.get().luxeid(readerId, pin).biometric().then(biometric => {
      return biometric.data.firstName + ' ' + biometric.data.lastName;
    });
  }

  getLuxTrustSigner() {
    // TODO retrieve name from signing certificate?
    return Promise.resolve('Signed with LuxTrust card');
  }

  getOberthurSigner() {
    // TODO retrieve name from signing certificate?
    return Promise.resolve('Signed with Oberthur card');
  }

  getPIVSigner(readerId, pin) {
    return this.Connector.get().piv(readerId).printedInformation({ pin }).then(info => {
      if (info.data && info.data.name && info.data.name.length) {
        return info.data.name;
      } else {
        return Promise.resolve('Signed with PIV card');
      }
    });
  }

  getPtEidSigner(readerId) {
    return this.Connector.get().pteid(readerId).idData().then(idData => {
      return idData.data.name + ' ' + idData.data.surname;
    });
  }


  signDocument(documentId, readerId, pin) {
    const service = this;
    return new Promise((resolve, reject) => {
      service.determineType(readerId, pin).then((res) => service.getDataForType(res)).then((signData) => {
        signData.docId = documentId;
        return Promise.resolve(signData).then((res) => service.dataToSign(res)).then( (dataToSign) => {
            return Promise.resolve({ readerId: readerId, pin, dataToSign: dataToSign });
          }).then((res) => service.signWithConnector(res)).then((signedData) => {
            signData.signedData = signedData;
            return Promise.resolve(signData);
          })
          .then((res) => service.workflowSign(res))
          .then(() => { resolve(); });
      }).catch(err => { reject(err); });

    });
  }

  signDocumentWithCertificateId(documentId, readerId, pin, certificateId) {
    const service = this;
    return new Promise((resolve, reject) => {
      service.determineType(readerId, pin).then((res) => service.getDataForType(res)).then((signData) => {
        signData.docId = documentId;
        return Promise.resolve(signData).then((res) => service.dataToSign(res)).then( (dataToSign) => {
          return Promise.resolve({ readerId: readerId, pin, dataToSign: dataToSign, id: certificateId });
        }).then((res) => service.signWithConnector(res)).then((signedData) => {
          signData.signedData = signedData;
          return Promise.resolve(signData);
        })
          .then((res) => service.workflowSign(res))
          .then(() => { resolve(); });
      }).catch(err => { reject(err); });

    });
  }

  // Needs proxy
  dataToSign(signData) {
    return this.http.post('api/cards/datatosign', signData).toPromise();
  }

  signWithConnector (inputObj) {
    return this.Connector.get().sign(inputObj.readerId, { pin: inputObj.pin,
      data: inputObj.dataToSign.bytes,
      algorithm_reference: inputObj.dataToSign.digestAlgorithm,
      id: inputObj.id})
      .then(res => res.data);
  }

  // Needs proxy
  workflowSign(signData) {
    return this.http.post('api/cards/sign', signData).toPromise();
  }

  downloadDocument(documentName) {
    return this.http.post('api/cards/be/download', { documentName: documentName }, { responseType: 'blob' });
  }

  downloadRaw(viewLink) {
    return this.http.post('api/cards/lux/download', { url: viewLink}, { responseType: 'blob' });
  }
}


