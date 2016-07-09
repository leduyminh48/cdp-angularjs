/**
 * @ngdoc overview
 * @name osmServerError
 * @description
 *
 * Module for server error interceptors
 */

import angular  from 'angular';
import toastr   from 'components/custom-toastr/custom-toastr.module';

export default angular.module('osmServerError',  //eslint-disable-line angular/file-name
  [
    toastr
  ])
  .config(/*@ngInject*/$httpProvider => {
    $httpProvider.interceptors.push('errorInterceptorFct');
  })
  .factory('errorInterceptorFct', errorInterceptorFactory)
  .name;

/**
 * @ngdocs service
 * @name osmServerError.errorInterceptorFct
 */
/*@ngInject*/
function errorInterceptorFactory($injector, $q, toastr) {
  /**
   * @param {Object} config Response config
   * @param {string} [message = ERR_SERVER] Message for toaster error
   * @param {boolean} [goToLogin = false] Need to jump to login page or not
   * @param {string} [title] Title of toastr error
   * @returns {Promise|Promise.<T>} Promise to return from the interceptor
   *
   * @description Provides default message, show toaster, goes to login and returns the promise
   */
  function processError(config, message, goToLogin, title) {
    if (config.status === -1) {
      return $q.reject('Request was cancelled');
    }

    const messages = $injector.get('errorMessageFct');

    message = message || messages('ERR_SERVER', {
      code: config.status,
      text: config.statusText || ''
    });

    if (title) {
      toastr.error(message, title);
    } else {
      toastr.error(message);
    }

    if (goToLogin) {
      //TODO: Provide go to login page code here
      $injector.get('statesFactory').goLogin(true);
    }

    const rejection = { status: config.status };

    if (angular.isObject(config.data)) {
      return $q.reject(angular.extend(config.data, rejection));
    }

    return $q.reject(rejection);
  }


  function process400(config, messages) {
    const $state = $injector.get('$state');

    if (config.status === 400 && $state.current.name === 'login') {
      return processError(config, messages('ERR_VALIDATION'));
    } else if (config.status === 400) {
      return processError(config, messages('ERR_VALIDATION'), true);
    }

    if (config.status === 401) {
      return processError(config, messages('ERR_AUTHENTICATION'), true);
    }

    if (config.status === 403) {
      return processError(config, messages('ERR_ACCESS', { resource: config.url }));
    }

    if (config.status === 404) {
      return processError(config, messages('ERR_NOT_FOUND', { resource: config.url }));
    }

    return null;
  }


  function process500(config, messages) {
    if (config.status === 500) {
      return processError(config, messages('ERR_APPLICATION', {
        details: config.details
      }), false, config.summary);
    }

    return null;
  }


  return {
    responseError(config) {
      const messages = $injector.get('errorMessageFct');

      return process400(config, messages) || process500(config, messages) || processError(config);
    }
  };
}
