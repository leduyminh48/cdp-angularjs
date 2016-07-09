import templateUrl from './breadcrumb.tpl.html';

class BreadcrumbCtrl {
  /*@ngInject*/
  /**
   * @ngdoc controller
   * @name osmBreadcrumb.BreadcrumbCtrl
   *
   * @class
   * @description
   * Controller for breadcrumb component
   * breadcrumbs can be changed, so we dont need one-time binding in template
   */
}


/**
 * @ngdoc directive
 * @restrict 'E'
 * @name osmBreadcrumb.osmBreadcrumb
 * @param {Array} breadcrumbItems - list of breadcrumb items
 * @param {string} delimiterType - delimiter for items (for cases when custom delimiter is needed - specify class here
 * and add overriding styles in breadcrumb.less file)
 * @scope
 *
 * @description
 * Component to render breadcrumb based on passed in attributes
 *
 * @exmaple
 * <osm-breadcrumb breadcrumb-items="['Home', 'Rooms', 'Anodora']" delimiter-type="'vertical-line'"></osm-breadcrumb>
 */
export default {
  templateUrl,
  controller: BreadcrumbCtrl,
  bindings  : {
    breadcrumbItems: '=*',
    delimiterType: '<'
  }
};
