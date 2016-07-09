import controller  from './view-detailed.controller';
import templateUrl from './view-detailed.tpl.html';


/**
 * @ngdoc directive
 * @name osmViewOfficeDetailed.osmViewOfficeDetailed
 * @scope
 *
 * @description Component for office detailed view
 */
export default {
  url: '/detailed/:id',

  controller,
  templateUrl,
  controllerAs: 'view'
};
