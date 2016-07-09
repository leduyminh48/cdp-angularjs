import controller  from './button-back.controller';
import templateUrl from './button-back.tpl.html';

/**
 * @ngdoc directive
 * @name osmButtonBack.osmButtonBack
 * @scope
 *
 * @description button that goes back to prev state
 */
export default {
  controller,
  templateUrl,
  controllerAs: 'button'
};
