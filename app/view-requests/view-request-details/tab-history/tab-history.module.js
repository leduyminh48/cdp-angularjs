import angular from 'angular';
import tabHistory from './tab-history.component';
import requestHistory from '../request-history';
import components from 'components';

/**
 * @ngdocs overview
 * @name osmTabHistory
 *
 * @description
 * Module for displaying requests history tab
 */
export default angular.module('osmTabHistory', [
  requestHistory,
  components
])
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.requests.details.history', tabHistory);
  })
  .name;
