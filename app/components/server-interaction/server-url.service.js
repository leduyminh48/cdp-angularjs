/**
 * @ngdoc overview
 * @name osmServerRequestUrl
 * @description
 *
 * Module for interceptor to change request url
 */

export default angular.module('osmServerRequestUrl', [])  //eslint-disable-line angular/file-name
  .config(/*@ngInject*/$httpProvider => {
    $httpProvider.interceptors.push('urlInterceptorFct');
  })
  .constant('baseApiUrl', '/api')
  .factory('urlInterceptorFct', urlInterceptorFactory)
  .name;

/**
 * @ngdocs service
 * @name osmServerRequestUrl.urlInterceptorFct
 */
/*@ngInject*/
function urlInterceptorFactory(baseApiUrl) {
  return {
    request(config) {
      config.url = config.url.replace('{api}', baseApiUrl);


      //TODO: Remove this when the server is ready
      config.url = config.url.replace(/^\/mock/, 'http://beta.json-generator.com/api/json/get');

      return config;
    }
  };
}
