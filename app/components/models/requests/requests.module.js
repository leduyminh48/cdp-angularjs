import angular from 'angular';
import ngResource from 'angular-resource';

import Employees from '../employees';
import Requests from './requests.service';

/**
 * @ngdocs overview
 * @name osmRequests
 *
 * @description
 * Module for requests models
 */
export default angular.module('osmRequests', [ //eslint-disable-line angular/file-name
  ngResource,
  Employees
])
  .factory('RequestsFct', Requests)
  .name;
