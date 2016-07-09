import angular from 'angular';

import distributionComponent from './places-distibution.component';

import './places-distibution.less';

/**
 * @ngdoc overview
 * @name osmPlacesDistribution
 *
 * @description
 * Component for work places distribution
 */
export default angular.module('osmPlacesDistribution', []) //eslint-disable-line angular/file-name
  .component('osmPlacesDistribution', distributionComponent)
  .name;
