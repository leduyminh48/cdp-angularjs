import controller  from './tab-history.controller';
import templateUrl from './tab-history.tpl.html';

/**
 * @ngdoc directive
 * @name osmOfficePlaceTabHistory.osmOfficePlaceTabHistory
 * @scope
 *
 * @description Component for office place history information tab
 */
export default {
  url: '/history',
  controller,
  templateUrl,
  controllerAs: 'ctrl'
};
