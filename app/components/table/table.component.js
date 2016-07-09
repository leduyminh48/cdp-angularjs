import templateUrl from './table.tpl.html';

class TableCtrl {
  /*@ngInject*/
  /**
   * @ngdoc controller
   * @name osmTable.TableCtrl
   *
   * @class
   * @description
   * Controller for table component
   */
}


/**
 * @ngdoc directive
 * @name osmTable.osmTable
 *
 * @scope
 * @property {string} personName Name of the person
 *
 * @description
 * Component to render a table
 */
export default {
  templateUrl,
  controller: TableCtrl,
  bindings: {
    options: '<'
  }
};
