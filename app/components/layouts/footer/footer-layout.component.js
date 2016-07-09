import controller  from './footer-layout.controller';
import templateUrl from './footer-layout.tpl.html';
import './footer.less';


/**
 * @ngdoc directive
 * @name osmLayouts.osmFooter
 * @scope
 *
 * @description Footer layout component
 */
export default {
  templateUrl,
  controller,
  controllerAs: 'footer'
};
