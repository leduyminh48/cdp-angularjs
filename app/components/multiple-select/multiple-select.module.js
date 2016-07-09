import angular         from 'angular';
import customBootstrap from 'components/custom-bootstrap';

import multipleSelect  from './multiple-select.component';
import dropdownSelect  from './dropdown-select.component';
import './dropdown-select.less';

/**
 * @ngdocs overview
 * @name osmMultipleSelect
 *
 * @description
 * Module for multiple select components
 */
export default angular.module('osmMultipleSelect', [
  customBootstrap
])

  .component('osmDropdownSelect', dropdownSelect)
  .component('osmMultipleSelect', multipleSelect)
  .name;
