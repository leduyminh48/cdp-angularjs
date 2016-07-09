import controller  from './view-tree.controller';
import templateUrl from './view-tree.tpl.html';


/**
 * @ngdoc directive
 * @name osmViewOfficeTree.osmViewOfficeTree
 * @scope
 *
 * @description Component for office tree view
 */
export default {
  url: '/tree/:id',

  controller,
  templateUrl,
  controllerAs: 'view'
};
