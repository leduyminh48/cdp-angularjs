import angular from 'angular';
import requestHistory from './request-history.component';
import './request-history.less';

/**
 * @ngdocs overview
 * @name osmRequestHistory
 *
 * @description
 * Module for displaying requests history
 */
export default angular.module('osmRequestHistory', [])
  .component('osmRequestHistory', requestHistory)
  .name;
