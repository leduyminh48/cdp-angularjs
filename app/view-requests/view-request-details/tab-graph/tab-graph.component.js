import controller  from './tab-graph.controller';
import templateUrl from './tab-graph.tpl.html';

/**
 * @ngdoc directive
 * @name osmTabGraph.osmTabGraph
 * @scope
 *
 * @description Component for requests graph tab
 */
export default {
  url: '/graph',
  controller,
  templateUrl,
  controllerAs: 'ctrl'
};
