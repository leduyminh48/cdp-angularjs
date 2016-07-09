import './controls.less';

import angular from 'angular';
import buttonBack from './button-back';

/**
 * @ngdocs overview
 * @name osmControls
 *
 * @description
 * Module for all basic controls like buttons, checkboxes, etc.
 */
export default angular.module('osmControls', [
  buttonBack
])
  .name;

