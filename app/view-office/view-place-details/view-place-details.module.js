import angular    from 'angular';
import components from 'components';

import viewComponent from './view-place-details.component';

import tabMain    from './tab-main';
import tabHistory from './tab-history';

import  './view-place-details.less';

/**
 * @ngdocs overview
 * @name osmViewPlaceDetails
 *
 * @description
 * Module office place details view
 */
export default angular.module('osmViewPlaceDetails', [
  components,
  tabMain,
  tabHistory
])

  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.office.details', viewComponent);
  })
  .name;
