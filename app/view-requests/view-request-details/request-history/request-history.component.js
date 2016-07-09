import controller  from './request-history.controller.js';
import templateUrl from './request-history.tpl.html';

/**
 * @ngdoc directive
 * @name osmRequestHistory.osmRequestHistory
 * @scope
 *
 * @description Component for history requests
 */
export default {
  controller,
  templateUrl,
  bindings    : {
    history  : '=*history'
  },
  controllerAs: 'ctrl'
};
