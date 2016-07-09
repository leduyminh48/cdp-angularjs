import angular from 'angular';

import logoutComponent from './logout.component';
import './logout.less';

/**
 * @ngdoc overview
 * @name osmLogout
 *
 * @description
 * Component for logout
 */
export default angular.module('osmLogout', [])

  .component('osmLogout', logoutComponent)
  .name;
