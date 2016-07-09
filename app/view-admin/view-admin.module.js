import angular   from 'angular';

import adminComponent from './view-admin.component';


//TODO: Use http://mbenford.github.io/ngTagsInput/ for tag input
/**
 * @ngdoc overview
 * @name osmAdmin
 *
 * @description
 * Hold component for generating administration layout
 */
export default angular.module('osmViewAdmin', [])  //eslint-disable-line angular/file-name
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.admin', adminComponent);
  })
  .name;
