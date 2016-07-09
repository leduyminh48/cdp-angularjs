import angular from 'angular';
import buttonBack from './button-back.component';

/**
 * @ngdocs overview
 * @name osmButtonBack
 *
 * @description
 * Module for button that goes back to prev state
 */
export default angular.module('osmButtonBack', [])
  .component('osmButtonBack', buttonBack)
  .name;
