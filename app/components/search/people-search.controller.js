export default class PeopleSearchCtrl {

  /**
   * @ngdoc controller
   * @name osmPeopleSearch.PeopleSearchCtrl
   * @class
   *
   * @description Controller for people search components
   */

  /*@ngInject*/
  constructor(defaultConfigConst) {
    this.defaultConfigConst = defaultConfigConst;
  }

  $onInit() {
    Object.keys(this.defaultConfigConst).forEach(key => {
      if (angular.isUndefined(this[key])) {
        this[key] = this.defaultConfigConst[key];
      }
    });
  }

  /**
   * @ngdocs method
   * @methodOf osmPeopleSearch.PeopleSearchCtrl
   * @name osmPeopleSearch.PeopleSearchCtrl#lookupPeople
   *
   * @param {string} query Query to be sent to server
   * @return {array} Matches list
   *
   * @description Function for retrieving search results
   */
  lookupPeople(query) {
    return this.onQuery({
      query
    });
  }

  /**
   * @ngdocs method
   * @methodOf osmPeopleSearch.PeopleSearchCtrl
   * @name osmPeopleSearch.PeopleSearchCtrl#clearSelected
   *
   *
   * @description Function for clearing search results
   */
  clearSelected() {
    this.search = '';
    this.onClick();
  }

  /**
   * @ngdocs method
   * @methodOf osmPeopleSearch.PeopleSearchCtrl
   * @name osmPeopleSearch.PeopleSearchCtrl#onKeypress
   *
   * @param {Object} match Match on which key press was performed
   * @param {Event} event Key press event
   *
   * @description Handler for key press on an match element
   */
  onKeypress(match, event) {
    if (event.which === 13) {
      this.onSelect({ match });
    }
  }

  /**
   * @ngdocs method
   * @methodOf osmPeopleSearch.PeopleSearchCtrl
   * @name osmPeopleSearch.PeopleSearchCtrl#onClick
   *
   * @param {Object} match Match on which click was performed
   *
   * @description Handler for click on match.
   */
  onClick(match) {
    this.onSelect({ match });
  }
}
