import angular           from 'angular';
import requestPagination from './request-pagination.component';

import './request-pagination.less';

/**
 * @ngdocs overview
 * @name osmRequestPagination
 *
 * @description
 * Module for request pagination
 */
export default angular.module('osmRequestPagination', [
])
  .constant('paginationDirectionsConst', {
    left : 'left',
    right: 'right'
  })
  .component('osmRequestPagination', requestPagination)
  .name;
