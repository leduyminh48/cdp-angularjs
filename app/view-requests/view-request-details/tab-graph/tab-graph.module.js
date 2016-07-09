import angular from 'angular';
import tabGraph from './tab-graph.component';
import requestGraph from '../request-graph';
import components from 'components';

/**
 * @ngdocs overview
 * @name osmTabGraph
 *
 * @description
 * Module for displaying requests graph tab
 */
export default angular.module('osmTabGraph', [
  requestGraph,
  components
])
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.requests.details.graph', tabGraph);
  })
  .name;
