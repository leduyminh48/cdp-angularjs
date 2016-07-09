import controller  from './tab-history.controller';
import templateUrl from './tab-history.tpl.html';

/**
 * @ngdoc directive
 * @name osmTabHistory.osmTabHistory
 * @scope
 *
 * @description Component for requests history tab
 */
export default {
  url: '/history',
  controller,
  templateUrl,
  controllerAs: 'ctrl'
};
