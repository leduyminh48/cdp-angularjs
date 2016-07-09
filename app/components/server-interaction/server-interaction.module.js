import angular    from 'angular';
import ngResource from 'angular-resource';
import ngCookies  from 'angular-cookies';

import router    from '../router';

import acServerUrl    from './server-url.service.js';
import acServerAuth   from './server-authentication.service.js';
import acServerUnpack from './server-unpack.service.js';
import acServerError  from './server-error.service.js';

/**
 * @ngdoc overview
 * @name osmServerInteraction
 * @description
 *
 * Holds services, configuration and interceptors for server interaction services
 */
export default angular.module('osmServerInteraction', [
  ngResource,
  ngCookies,

  router,

  acServerUrl,
  acServerAuth,
  acServerUnpack,
  acServerError
])
  .config(/*@ngInject*/$resourceProvider => {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = true;
  })

  .config(/*@ngInject*/$httpProvider => {
    $httpProvider.useApplyAsync(true);
    $httpProvider.useLegacyPromiseExtensions(false);
  })
  .run(/*@ngInject*/($cookies, routerStatusFct) => {
    if (!routerStatusFct.isLocalRun()) {
      return;
    }

    $cookies.put('JSESSIONID', '7E0371BE051937F60BBEDAD1B5D26A5F');
  })
  .factory('errorMessageFct', /*@ngInject*/$interpolate => {
    const messages = {
      ERR_SERVER        : $interpolate('Error **{{ code }}** with message **{{ text }}** for server request'),
      ERR_VALIDATION    : $interpolate('Wrong credentials'),
      ERR_AUTHENTICATION: $interpolate('Session is over or modified, please login once again'),
      ERR_NOT_FOUND     : $interpolate('Resource **{{ resource }}** was not found on the server'),
      ERR_APPLICATION   : $interpolate('Reason: {{ details }}'),
      ERR_ACCESS        : $interpolate('You are not allowed to access **{{ resource }}**')
    };

    return (code, params) => {
      if (!messages[code]) {
        return 'Server error';
      }

      return messages[code](params);
    };
  })
  .name;
