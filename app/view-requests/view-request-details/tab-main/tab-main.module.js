import angular from 'angular';
import tabMain from './tab-main.component';
import components from 'components';

import './tab-main.less';

/**
 * @ngdocs overview
 * @name osmTabMain
 *
 * @description
 * Module for displaying requests main information tab
 */
export default angular.module('osmTabMain', [
  components
])
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.requests.details.main', tabMain);
  })
  .name;
