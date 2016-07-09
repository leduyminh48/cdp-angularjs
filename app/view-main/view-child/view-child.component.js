import templateUrl from './view-child.tpl.html';

class ChildCtrl {
  /*@ngInject*/
  /**
   * @ngdoc controller
   *
   * @class
   * @description
   * Controller for child component
   */
}


/**
 * @ngdoc directive
 * @name osmChild.osmChildLayout
 *
 * @scope
 *
 * @description
 * Component to render child layout
 */
export default {
  url       : '/child',
  templateUrl,
  controller: ChildCtrl
};
