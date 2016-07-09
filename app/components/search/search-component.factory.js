import templateUrl from './search.tpl.html';

/**
 * @ngdoc factory
 * @name osmSearch.osmSearch
 *
 * @description Factory for generating search component base on controller
 */
export default controller => ({
  controller,
  templateUrl,
  bindings    : {
    search         : '<ngModel',
    itemTemplateUrl: '@',
    minInputLength : '@',
    waitMs         : '@',
    disabled       : '<',
    clearable      : '<',
    onQuery        : '&',
    onSelect       : '&',
    onChange       : '&'
  },
  controllerAs: 'search'
});
