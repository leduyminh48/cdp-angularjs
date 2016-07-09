import angular from 'angular';

import controller  from './progress-bar.controller';
import templateUrl from './progress-bar.tpl.html';
import './progress-bar.less';
import './icons/loader.svg';

/**
 * @ngdocs overview
 * @name osmProgressBar
 *
 * @description
 * Module for progress bar
 */
export default angular.module('osmProgressBar', [])
/**
 * @ngdoc directive
 * @name osmProgressBar.osmProgressBar
 * @scope
 *
 * @description Progress bar component
 */
  .component('osmProgressBar', {
    templateUrl,
    controller,
    transclude  : true,
    controllerAs: 'progress',
    bindings    : {
      isActive: '<'
    }
  })
  .name;
