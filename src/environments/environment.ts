// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  name: 'ReadMyCards',
  version: '2.0.0',
  gwOrProxyUrl: 'https://accapim.t1t.be:443',
  gclUrl: 'https://localhost:10443/v2',
  ocvContextPath: '/trust1team/ocv-api/v2',
  implicitDownload: false,
  osPinDialog: true,
  consentCodeLength: 8,
  consentDuration: 1,
  consentTimeout: 20
};
