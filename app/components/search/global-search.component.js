import searchComponentFct from './search-component.factory';
import controller         from './global-search.controller';

/**
 * @ngdoc directive
 * @name osmPeopleSearch.osmGlobalSearch
 * @scope
 *
 * @description Component for searching globally
 */
export default searchComponentFct(controller);
