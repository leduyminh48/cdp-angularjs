import PeopleSearchController from './people-search.controller';

export default class GlobalSearchController extends PeopleSearchController {

  /**
   * @ngdoc controller
   * @name osmPeopleSearch.GlobalSearchCtrl
   * @class
   *
   * @description Controller for people search components
   */

  /*@ngInject*/
  constructor(defaultConfigConst) {
    super(defaultConfigConst);
    this.forGlobal = true;
  }
}
