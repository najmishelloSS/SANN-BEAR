// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  stripe: {
    publishableKey :'pk_test_51ORPauC1wAehoBy5RVL9j1UnBmtilUN38wT4vUwteBMBgp3GEHbY4UYdpwXabAjG3FvIbMQ9y2YhQ0bxB8g7vCM600E1D7REkI',
    secretKey :'sk_test_51ORPauC1wAehoBy5dKXcQrG8TwXVwo7OUq7ScNOLBlc33o962juKIqVAJuKZ6fp1WEYIbnhfuE6DUmQtdjiVYM5Q00b0VpL1Mf'
  },
  api: 'http://localhost:3000/',
  ktdi_api : 'http://ktdiapp.mooo.com/api/'
  // ktdi_api : 'http://localhost/ktdiapp/api/'
  // ktdi_api : 'http://10.201.102.131:8100/ktdiapp/api/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
