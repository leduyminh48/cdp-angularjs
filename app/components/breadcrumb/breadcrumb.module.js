import angular from 'angular';

import breadcrumbComponent from './breadcrumb.component';
import './breadcrumb.less';

/**
 * @ngdoc overview
 * @name osmBreadcrumb
 *
 * @description
 * Component for creating breadcrumb views
 */
export default angular.module('osmBreadcrumb', [])

  .component('osmBreadcrumb', breadcrumbComponent)
  .name;
