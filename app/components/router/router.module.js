import angular from 'angular';

import 'angular-ui-router';

import routerStatus from './router-status.service';
/**
 * @ngdoc overview
 * @name osmRouter
 *
 * @description
 * Module for router customization and helpers
 */
export default angular.module('osmRouter', [ //eslint-disable-line angular/file-name
  'ui.router'
])
  .config(/*@ngInject*/$locationProvider => $locationProvider.html5Mode(true))
  .provider('routerStatusFct', routerStatus)
  .name;
