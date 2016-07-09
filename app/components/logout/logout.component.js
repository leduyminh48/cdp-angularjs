import templateUrl from './logout.tpl.html';

class LogoutCtrl {
  /*@ngInject*/
  /**
   * @ngdoc controller
   * @name osmLogout.LogoutCtrl
   *
   * @class
   * @description
   * Controller for Logout component
   */
}


/**
 * @ngdoc directive
 * @restrict 'E'
 * @name osmLogout.osmLogout
 * and add overriding styles in logout.less file)
 * @scope
 *
 * @description
 * Component to render logout based on passed in attributes
 *
 * @example
 * <osm-logout></osm-logout>
 */
export default {
  templateUrl,
  controller: LogoutCtrl
};
