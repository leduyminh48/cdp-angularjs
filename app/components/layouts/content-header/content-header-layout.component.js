import angular from 'angular';

import templateUrl from './content-header-layout.tpl.html';
import './content-header.less';


/**
 * @ngdoc directive
 * @name osmLayouts.osmFooter
 * @scope
 *
 * @description Footer layout component
 */
export  default {
  templateUrl,
  controller: angular.noop,
  controllerAs: 'contentHeader',
  transclude  : true
};
