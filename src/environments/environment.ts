// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,  
    authURL: 'http://localhost:8080/auth/',
    changePasswordURL: 'http://localhost:8080/email-password/',
    personaURL: 'http://localhost:8080/api/persona/',
    educationURL: 'http://localhost:8080/api/education/',
    experienceURL: 'http://localhost:8080/api/experience/',
    projectURL: 'http://localhost:8080/api/project/',
    skillURL: 'http://localhost:8080/api/skill/',
    // Modify with your firebase storage api key data.
    firebase: {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    }
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  
