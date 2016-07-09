// import angular     from 'angular';
import templateUrl from './tabs-layout.tpl.html';

import './tabs.less';

/**
 * @ngdoc directive
 * @name osmTabs.osmTabs
 * @scope
 *
 * @description Tabs component
 */
export default {
  templateUrl,
  /*@ngInject*/
  controller($element) {
    $element.addClass('oui-tabs');
  },
  controllerAs: 'tabs',
  transclude  : {
    contentSlot : 'osmTabsContent',
    controlsSlot: 'a'
  }
};
