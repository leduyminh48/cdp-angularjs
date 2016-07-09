import angular   from 'angular';

import childComponent       from './view-child.component';
import multipleSelectSample from 'components/multiple-select-units/sample/multiple-select-units-sample.module'; //TODO: Remove after finishing the component

/**
 * @ngdoc overview
 * @name osmChild
 *
 * @description
 * Hold component for generating child layout
 */
export default angular.module('osmViewChild', [
  multipleSelectSample
])
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.child', childComponent);
  })
  .name;
