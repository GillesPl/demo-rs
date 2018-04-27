// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  name: 'ReadMyCards',
  version: '2.0.0',
  apiKey: '7de3b216-ade2-4391-b2e2-86b80bac4d7d',
  gwOrProxyUrl: 'https://accapim.t1t.be:443',
  gclUrl: 'https://localhost:10443/v2',
  implicitDownload: false,
  osPinDialog: true,
  consentCodeLength: 8,
  consentDuration: 1,
  consentTimeout: 20
};
