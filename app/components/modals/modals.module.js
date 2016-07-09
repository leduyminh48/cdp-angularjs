import angular from 'angular';
import  customBootstrap from '../custom-bootstrap';

import modalsService from './modals.service';

import './modals.less';

/**
 * @ngdocs overview
 * @name osmModals
 *
 * @description
 * Module for modals
 */
export default angular.module('osmModals', [ //eslint-disable-line angular/file-name
  customBootstrap
])
  .factory('osmModalsFct', modalsService)
  .name;
