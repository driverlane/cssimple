// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cgiPath: '/otcs/cs.exe',
  start: 2000,
  title: 'otcs-simple'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// add some cS environment stuff
(() => {
  if (!cookieExists()) {
    console.log('Dev harness adding llcookie');
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = 'LLCookie=adevticket;' + expires + ';path=/';
  }
})();

function cookieExists(): boolean {
  let response = false;
  const name = 'LLCookie=';
  decodeURIComponent(document.cookie).split(';').forEach(cookie => {
    if (cookie.startsWith(name)) {
      response = true;
    }
  });
  return response;
}