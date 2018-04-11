import { Injectable } from '@angular/core';

@Injectable()
export class Connector {

  constructor() { }

  private GCLLib = window['GCLLib'];
  private connector = this.initialize();

  initialize() {
    console.log(Connector.name + ' :: initialize T1C-JS...');
    const gclConfig = new this.GCLLib.GCLConfig({ apiKey: '7de3b216-ade2-4391-b2e2-86b80bac4d7d' });
    this.connector = this.GCLLib.GCLClient.initialize(gclConfig).then(client => {
      client.core().version().then(version => {
        console.log(Connector.name + ' :: T1C-JS ' + version + ' initialized.');
      });
      this.connector = client;
      return this.connector;
    });
    return Promise.resolve(this.connector);
  }

  isGCLAvailable() {
    return this.getConnector().then(conn => {
      return conn.core().info().then(() => true);
    }).catch(() => false);
  }

  getConnector() {
    return Promise.resolve(this.connector);
  }
}
