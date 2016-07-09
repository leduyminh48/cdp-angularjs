import controller  from './dropdown-select.controller';
import templateUrl from './dropdown-select.tpl.html';

/**
 * @ngdoc directive
 * @name osmMultipleSelect.osmDropdownSelect
 * @scope
 *
 * @description Component for select based on dropdown
 */
export default {
  controller,
  templateUrl,
  bindings    : {
    list     : '<selectList',
    selected : '<selectedItem',
    titleKey : '<',
    emptyText: '<',
    onSelect : '&'
  },
  controllerAs: 'select'
};
