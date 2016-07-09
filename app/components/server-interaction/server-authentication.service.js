/**
 * @ngdoc overview
 * @name osmServerAuthentication
 * @description
 *
 * Module authentication server requests
 */
import angular from 'angular';

export default angular.module('osmServerAuthentication', []) //eslint-disable-line angular/file-name

  .config(/*@ngInject*/$httpProvider => {
    $httpProvider.interceptors.push('authInterceptorFct');
  })
  .factory('authInterceptorFct', authInterceptorFactory)
  .name;

/**
 * @ngdocs service
 * @name osmServerAuthentication.authInterceptorFct
 */
/*@ngInject*/
function authInterceptorFactory(baseApiUrl) {
  return {
    request(config) {
      if (config.url.indexOf('.html') !== -1) {
        return config;
      }

      if (config.url.startsWith(baseApiUrl)) {
        config.withCredentials = true;

        return config;
      }

      return config;
    }
  };
}
