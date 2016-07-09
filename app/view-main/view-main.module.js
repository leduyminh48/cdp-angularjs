import angular   from 'angular';

import child from './view-child'; //TODO: Remove this after testing

import mainComponent from './view-main.component';


/**
 * @ngdoc overview
 * @name osmMain
 *
 * @description
 * Hold component for generating main layout
 */
export default angular.module('osmViewMain', [
  child //TODO: Remove this after testing
])
  .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/app/requests/active');

    $stateProvider
      .state('main', mainComponent);
  })
  .name;
