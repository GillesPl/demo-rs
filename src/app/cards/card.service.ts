import { Injectable } from '@angular/core';
import {Connector} from '../connector.service';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CardService {

  constructor(private Connector: Connector, private http: HttpClient) {}


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
        return getAventraCertificates();
      case 'beid':
        return getBeIDCertificates();
      case 'dnie':
        return getDNIeCertificates();
      case 'luxeid':
        return getLuxIDCertificates();
      case 'luxtrust':
        return getLuxTrustCertificates();
      case 'oberthur':
        return getOberthurCertificates();
      case 'piv':
        return getPIVCertificates();
      case 'pteid':
        return getPtEidCertificates();
      default:
        return Promise.reject('Cannot retrieve certificates');
    }


    function getAventraCertificates() {
      return service.Connector.get().aventra(readerId)
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

    function getBeIDCertificates() {
      return service.Connector.get().beid(readerId)
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

    function getDNIeCertificates() {
      return service.Connector.get().dnie(readerId)
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

    function getLuxIDCertificates() {
      return service.Connector.get().luxeid(readerId, pin)
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

    function getLuxTrustCertificates() {
      return service.Connector.get().luxtrust(readerId)
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

    function getOberthurCertificates() {
      return service.Connector.get().oberthur(readerId)
        .allCerts({ filter: ['root-certificate', 'authentication-certificate', 'signing-certificate'] }).then(certs => {
          return {
            digestAlgoWrapper: 'SHA512',
            certificates:    [ certs.data.signing_certificate.base64,
              certs.data.authentication_certificate.base64,
              certs.data.root_certificate.base64 ],
            signCertificate: certs.data.signing_certificate.base64
          };
        });
    }

    function getPIVCertificates() {
      return service.Connector.get().piv(readerId)
        .allCerts({ filter: ['authentication-certificate', 'signing-certificate'] }).then(certs => {
          return {
            digestAlgoWrapper: 'SHA512',
            certificates:    [ certs.data.signing_certificate.base64,
              certs.data.authentication_certificate.base64 ],
            signCertificate: certs.data.signing_certificate.base64
          };
        });
    }

    function getPtEidCertificates() {
      return service.Connector.get().pteid(readerId)
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
        return getAventraSigner();
      case 'beid':
        return getBeIDSigner();
      case 'dnie':
        return getDNIeSigner();
      case 'luxeid':
        return getLuxIDSigner();
      case 'luxtrust':
        return getLuxTrustSigner();
      case 'oberthur':
        return getOberthurSigner();
      case 'piv':
        return getPIVSigner();
      case 'pteid':
        return getPtEidSigner();
      default:
        return Promise.reject('Cannot retrieve certificates');
    }

    function getAventraSigner() {
      // TODO retrieve name from signing certificate?
      return Promise.resolve('Signed with Aventra card');
    }

    function getBeIDSigner() {
      return service.Connector.get().beid(readerId).rnData().then(rnData => {
        return rnData.data.first_names.split(' ', 1) + ' ' + rnData.data.name;
      });
    }

    function getDNIeSigner() {
      return service.Connector.get().dnie(readerId).info().then(info => {
        return info.data.firstName + ' ' + info.data.firstLastName;
      });
    }


    function getLuxIDSigner() {
      return service.Connector.get().luxeid(readerId, pin).biometric().then(biometric => {
        return biometric.data.firstName + ' ' + biometric.data.lastName;
      });
    }

    function getLuxTrustSigner() {
      // TODO retrieve name from signing certificate?
      return Promise.resolve('Signed with LuxTrust card');
    }

    function getOberthurSigner() {
      // TODO retrieve name from signing certificate?
      return Promise.resolve('Signed with Oberthur card');
    }

    function getPIVSigner() {
      return service.Connector.get().piv(readerId).printedInformation({ pin }).then(info => {
        if (info.data && info.data.name && info.data.name.length) {
          return info.data.name;
        } else {
          return Promise.resolve('Signed with PIV card');
        }
      });
    }

    function getPtEidSigner() {
      return service.Connector.get().pteid(readerId).idData().then(idData => {
        return idData.data.name + ' ' + idData.data.surname;
      });
    }
  }


  signDocument(documentId, readerId, pin) {
    const service = this;
    return new Promise((resolve, reject) => {
      service.determineType(readerId, pin).then(service.getDataForType).then(function(signData) {
        signData.docId = documentId;
        return Promise.resolve(signData)
          .then(service.dataToSign)
          .then(function (dataToSign) {
            return Promise.resolve({ readerId: readerId, pin: pin, dataToSign: dataToSign });
          })
          .then(service.signWithConnector)
          .then(function (signedData) {
            signData.signedData = signedData;
            return Promise.resolve(signData);
          })
          .then(service.workflowSign)
          .then(function () { resolve(); });
      }).catch(err => { reject(err); });

    });
  }

  // Needs proxy
  dataToSign(signData) {
    return this.http.post('api/cards/datatosign', signData).toPromise().then(function (res: any) { return res.data; });
  }

  signWithConnector (inputObj) {
    return this.Connector.get().sign(inputObj.readerId, { pin: inputObj.pin,
      data: inputObj.dataToSign.bytes,
      algorithm_reference: inputObj.dataToSign.digestAlgorithm })
      .then(res => res.data);
  }

  // Needs proxy
  workflowSign(signData) {
    return this.http.post('api/cards/sign', signData).toPromise().then(function (res: any) { return res.data; });
  }
}


