import templateUrl from './request-pagination.tpl.html';

import controller  from './request-pagination.controller';

/**
 * @ngdoc directive
 * @restrict 'E'
 * @name osmRequestPagination.osmRequestPagination
 * @param {number} perPage - number of items to display on one page
 * @param {number} currentPage - the current page number
 * @param {number} totalPagesAmount - number of the whole amount of pages
 * @param {Function} movePagination - changes current page by increasing or decreasing one point from the current
 * @scope
 *
 * @description
 * Component to render pagination based on passed in attributes
 *
 * @exmaple
 * <osm-request-pagination per-page="view.pageSize"
      current-page="view.pageNumber"
      move-pagination="view.movePagination(direction)"
      total-pages-amount="view.totalPagesAmount"></osm-request-pagination>
 */
export default {
  templateUrl,
  controller,
  bindings    : {
    perPage         : '<',
    currentPage     : '<',
    totalPagesAmount: '<',
    movePagination  : '&'
  },
  controllerAs: 'pagination'
};
