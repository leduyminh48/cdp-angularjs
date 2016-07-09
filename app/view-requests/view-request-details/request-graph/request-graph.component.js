import controller  from './request-graph.controller';
import templateUrl from './request-graph.tpl.html';

/**
 * @ngdoc directive
 * @name osmRequestGraph.osmRequestGraph
 * @scope
 *
 * @description Component for requests graph
 */
export default {
  controller,
  templateUrl,
  bindings    : {
    requests  : '=*requests'
  },
  controllerAs: 'ctrl'
};
