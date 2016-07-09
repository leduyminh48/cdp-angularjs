import angular   from 'angular';

import searchComponent from './view-search.component';


/**
 * @ngdoc overview
 * @name osmSearch
 *
 * @description
 * Hold component for generating search layout
 */
export default angular.module('osmViewSearch', [])
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.search', searchComponent);
  })
  .name;
