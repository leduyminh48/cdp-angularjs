import angular from 'angular';
import tabMain from './tab-main.component';

import components from 'components';

import './tab-main.less';

/**
 * @ngdocs overview
 * @name osmOfficePlaceTabMain
 *
 * @description
 * Module for displaying office place main information tab
 */
export default angular.module('osmOfficePlaceTabMain', [ //eslint-disable-line
  components
])
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.office.details.main', tabMain);
  })
  .name;
