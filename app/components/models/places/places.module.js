import angular from 'angular';
import ngResource from 'angular-resource';
import Places from './places.service';

/**
 * @ngdocs overview
 * @name osmPlaces
 *
 * @description
 * Module for places models
 */
export default angular.module('osmPlaces', [ //eslint-disable-line angular/file-name
  ngResource
])
  .factory('PlacesFct', Places)
  .name;
