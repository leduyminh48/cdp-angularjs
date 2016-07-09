/**
 * @ngdoc overview
 * @name osmServerUnpack
 * @description
 *
 * Module for unpack interceptor
 */
export default angular.module('osmServerUnpack', [])  //eslint-disable-line angular/file-name
  .config(/*@ngInject*/$httpProvider => {
    $httpProvider.interceptors.push('unpackInterceptorFct');
  })
  .factory('unpackInterceptorFct', unpackInterceptorFactory)
  .name;

/**
 * @ngdocs service
 * @name osmServerUnpack.unpackInterceptorFactory
 */
/*@ngInject*/
function unpackInterceptorFactory($injector, $q, toastr) {
  return {
    response(response) {
      const errorMessage = $injector.get('errorMessageFct');

      if (response.data.error) {
        toastr.error(errorMessage('ERR_SERVER', {
          text: response.data.error.message || response.data.error
        }));

        return $q.reject(response.data.error.message || response.data.error);
      }

      if (response.data.hasOwnProperty('data')) {
        response.data = response.data.data;

        return response;
      }

      return response;
    }
  };
}
