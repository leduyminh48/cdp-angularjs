import angular from 'angular';

import viewComponent         from './view-office.component';
import viewDetailedComponent from './view-detailed';
import viewTreeComponent     from './view-tree';
import viewPlaceDetails      from './view-place-details';

import assignOwnership       from './popup-assign-ownership';

/**
 * @ngdocs overview
 * @name osmViewOffice
 *
 * @description
 * Module office view
 */
export default angular.module('osmViewOffice', [
  viewDetailedComponent,
  viewTreeComponent,
  assignOwnership,
  viewPlaceDetails
])
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.office', viewComponent);
  })
  .name;
