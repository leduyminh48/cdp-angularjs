import angular         from 'angular';

import modelEmployees from './employees';
import modelPlaces    from './places';
import modelRequests  from './requests';
import modelUnits     from './units';

/**
 * @ngdocs overview
 * @name osmModels
 *
 * @description
 * Module for holding models
 */
export default angular.module('osmModels', [
  modelEmployees,
  modelPlaces,
  modelRequests,
  modelUnits
])

  .name;
