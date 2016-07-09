import angular    from 'angular';
import components from 'components';

import viewComponent       from './view-request.component';

import tabGraph from './tab-graph';
import tabMain from './tab-main';
import tabHistory from './tab-history';

import  './view-request.less';

/**
 * @ngdocs overview
 * @name osmViewRequest
 *
 * @description
 * Module request view
 */
export default angular.module('osmViewRequest', [ //eslint-disable-line angular/file-name
  components,
  tabGraph,
  tabMain,
  tabHistory
])

  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.requests.details', viewComponent);
  })
  .name;
