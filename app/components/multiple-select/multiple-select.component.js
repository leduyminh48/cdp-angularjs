import controller  from './multiple-select.controller';
import templateUrl from './multiple-select.tpl.html';

/**
 * @ngdoc directive
 * @name osmMultipleSelect.osmMultipleSelect
 * @scope
 *
 * @description Component for chained selects
 * It uses ng-model to be able to integrated with forms and provide validators for it
 * That is why 'required' attribute is allowed and it switches validation modes.
 *
 * In case of validation - onSelect handlers should return boolean values - true for not valid and false for valid.
 */
export default {
  require     : {
    ngModel: 'ngModel'
  },
  controller,
  templateUrl,
  bindings    : {
    groups   : '=*ngModel',
    onSelect : '&',
    titleKey : '<',
    emptyText: '@',
    name     : '@'
  },
  controllerAs: 'multi'
};
