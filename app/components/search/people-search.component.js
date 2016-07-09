import searchComponentFct  from './search-component.factory';
import controller from './people-search.controller';

/**
 * @ngdoc directive
 * @name osmPeopleSearch.osmPeopleSearch
 * @scope
 *
 * @description Component for searching people
 */
export default searchComponentFct(controller);
