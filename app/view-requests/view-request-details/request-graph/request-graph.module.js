import angular         from 'angular';
import requestGraph    from './request-graph.component';
import  './request-graph.less';

/**
 * @ngdocs overview
 * @name osmRequestGraph
 *
 * @description
 * Module for displaying requests graph
 */
export default angular.module('osmRequestGraph', [])

    .component('osmRequestGraph', requestGraph)
    .name;
