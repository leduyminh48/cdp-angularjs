import templateUrl from './view-admin.tpl.html';

class AdminCtrl {
  /*@ngInject*/
  /**
   * @ngdoc controller
   *
   * @class
   * @description
   * Controller for Administration component
   */
}


/**
 * @ngdoc directive
 * @name osmAdmin.osmAdminLayout
 *
 * @scope
 *
 * @description
 * Component to render administration layout
 */
export default {
  url       : '/admin',

  templateUrl,
  controller: AdminCtrl
};
