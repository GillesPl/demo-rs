import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pkcs11-config',
  templateUrl: './pkcs11-config.component.html',
  styleUrls: ['./pkcs11-config.component.less']
})
export class Pkcs11ConfigComponent implements OnInit {
  pkcs11Config: { mac: string, win: string, linux: string};

  private DEFAULT_CONFIG = {
    linux: '/usr/local/lib/libeTPkcs11.so',
    mac: '/usr/local/lib/libeTPkcs11.dylib',
    win: 'C:\\Windows\\System32\\eTPKCS11.dll'
  };

  constructor() { }

  ngOnInit() {
    // retrieve config from localStorage
    this.pkcs11Config = JSON.parse(localStorage.getItem('rmc-pkcs11-config'));
  }

  resetToDefault() {
    localStorage.setItem('rmc-pkcs11-config', JSON.stringify(this.DEFAULT_CONFIG));
    location.reload(true);
  }

  savePkcs11Config() {
    console.log(this.pkcs11Config);
    localStorage.setItem('rmc-pkcs11-config', JSON.stringify(this.pkcs11Config));
    location.reload(true);
  }

}
