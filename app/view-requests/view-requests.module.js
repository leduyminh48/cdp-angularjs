import angular from 'angular';

import viewComponent      from './view-requests.component';
import requestsPopup      from './popup-request';
import requestsPagination from './request-pagination';

import listComponent    from './view-requests-list';
import detailsComponent from './view-request-details';

import  './view-requests.less';

/**
 * @ngdocs overview
 * @name osmViewRequests
 *
 * @description
 * Module requests view
 */
export default angular.module('osmViewRequests', [
  requestsPopup,
  requestsPagination,

  listComponent,
  detailsComponent
])
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.requests', viewComponent);
  })
  .name;
