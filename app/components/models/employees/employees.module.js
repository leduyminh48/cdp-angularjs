import angular from 'angular';
import ngResource from 'angular-resource';
import Employees from './employees.service';

/**
 * @ngdocs overview
 * @name osmEmployees
 *
 * @description
 * Module for employee models
 */
export default angular.module('osmEmployees', [ //eslint-disable-line angular/file-name
  ngResource
])
  .factory('EmployeesFct', Employees)
  .name;
