import templateUrl from './person-link.tpl.html';

class PersonTelescopeLinkCtrl {
  /*@ngInject*/
  /**
   * @ngdoc controller
   * @name osmPersonLink.PersonTelescopeLinkCtrl
   *
   * @class
   * @description
   * Controller for person telescope link component.
   * Controller properties "compiledUrl" and "name" can be changed so one-time data binding is not acceptable.
   */
  constructor(linkFct) {
    this.linkFct = linkFct;
  }


  $onChanges(changesObj) {
    if (changesObj.name) {
      this.compiledUrl = this.linkFct.getToTelescope(changesObj.name.currentValue);
    }
  }
}


/**
 * @ngdoc directive
 * @name osmPersonLink.osmPersonTelescopeLink
 *
 * @scope
 * @property {string} personName Name of the person
 *
 * @description
 * Component to render link to a telescope profile page of the person with given name
 */
export default {
  templateUrl,
  controller: PersonTelescopeLinkCtrl,
  bindings  : {
    name: '<personName'
  }
};
