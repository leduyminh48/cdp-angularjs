import angular    from 'angular';
import ngResource from 'angular-resource';
import Places     from '../places';

import Units from './units.service';

/**
 * @ngdocs overview
 * @name osmUnits
 *
 * @description
 * Module for units models
 */
export default angular.module('osmUnits', [ //eslint-disable-line angular/file-name
  ngResource,
  Places
])
  .factory('UnitsFct', Units)
  .name;
