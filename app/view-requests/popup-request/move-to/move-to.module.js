import angular          from 'angular';

import moveToComponent  from './move-to.component';
import moveToService    from './move-to.service.js';


/**
 * @ngdoc overview
 * @name osmMoveTo
 *
 * @description
 * Hold wrapper component for generating "Move to" control on Movement request popup
 */
export default angular.module('osmMoveTo', []) //eslint-disable-line angular/file-name

  .factory('moveToFct', moveToService)
  .component('osmMoveTo', moveToComponent)
  .name;
