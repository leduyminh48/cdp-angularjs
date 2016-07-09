import angular from 'angular';

import templateUrl from './move-to.tpl.html';

class MoveToCtrl {
  /*@ngInject*/
  /**
   * @ngdoc controller
   * @name osmMoveTo.MoveToCtrl
   *
   * @class
   * @description
   * Controller for "move to" component.
   */
  constructor($q, $injector) {
    this.$q        = $injector.get('$q');
    this.moveToFct = $injector.get('moveToFct');
  }

  /**
   * @ngdoc method
   * @methodOf osmMoveTo.MoveToCtrl
   * @name osmMoveTo.MoveToCtrl#MAX_NUMBER_OF_GROUPS
   *
   * @description Maximal numbers of groups in multy select
   */
  static get MAX_NUMBER_OF_GROUPS() {
    return 4;
  }

  /**
   * @ngdoc method
   * @methodOf osmMoveTo.MoveToCtrl
   * @name osmMoveTo.MoveToCtrl#$initialize
   *
   * @description Initialization method
   */
  $initialize() {
    this.groups = [];
    this.loadMoveToGroups();
  }

  $onChanges(changesObj) {
    if (!this.directChange) {
      const ngModel = changesObj.ngModel;

      if (angular.isDefined(ngModel.currentValue)) {
        this.onChangedFromOutside(ngModel.currentValue);
      } else {
        this.$initialize();
      }
    }

    this.directChange = false;
  }

  /**
   * @ngdoc method
   * @methodOf osmMoveTo.MoveToCtrl
   * @name osmMoveTo.MoveToCtrl#onChangedFromOutside
   *
   * @param {Array} newPersonPlace new value of "ngModel" controller property
   *
   * @description This method handles changes of "ngModel" controller property
   */
  onChangedFromOutside(newPersonPlace) {
    this.groups = [];

    this.getPersonPlacePromise(newPersonPlace)
      .then(personPlaceArray => this.processPersonPlace(personPlaceArray));
  }

  /**
   * @ngdoc method
   * @methodOf osmMoveTo.MoveToCtrl
   * @name osmMoveTo.MoveToCtrl#getPersonPlacePromise
   *
   * @param {Array} personPlaceResourcesArray array of place resources related to person
   *
   * @description This method returns promise for all resources in personPlaceResourcesArray parameter
   */
  getPersonPlacePromise(personPlaceResourcesArray) {
    return this.$q.all.call(this, personPlaceResourcesArray.map(placeResource => placeResource.$promise));
  }

  /**
   * @ngdoc method
   * @methodOf osmMoveTo.MoveToCtrl
   * @name osmMoveTo.MoveToCtrl#processPersonPlace
   *
   * @param {Array} personPlaceArray array of place items related to person
   *
   * @description This method processing every place item
   */
  processPersonPlace(personPlaceArray) {
    const groupsPromisesArray = this.getGroupsPromisesArray(personPlaceArray);

    return this.$q.all
      .call(null, groupsPromisesArray)
      .then(groups =>
        groups.map((group, index) => {
          group          = this.moveToFct.prepareGroup(group);
          group.selected = personPlaceArray[index];
          this.groups.push(group);

          return this.groups;
        }));
  }

  /**
   * @ngdoc method
   * @methodOf osmMoveTo.MoveToCtrl
   * @name osmMoveTo.MoveToCtrl#getGroupsPromisesArray
   *
   * @param {Array} personPlaceArray array of place items
   *
   * @description This method returning array of promises with groups which relates to person's place
   */
  getGroupsPromisesArray(personPlaceArray) {
    return personPlaceArray.map(placeItem => {
      const groupResource = this.moveToFct.getGroup(placeItem.type);

      return groupResource.$promise;
    });
  }

  /**
   * @ngdoc method
   * @methodOf osmMoveTo.MoveToCtrl
   * @name osmMoveTo.MoveToCtrl#onSelect
   *
   * @param {number} groupIndex index of group
   * @param {Object} item selected item
   *
   * @description Handler for "on-select" action of multiple select component
   */
  onSelect(groupIndex, item) {
    const oldValue = this.ngModel;

    if (angular.isDefined(item.childEntityType)) {
      this.loadMoveToGroups(groupIndex, item.childEntityType);
    }

    this.directChange = true;
    this.onSelectCallback({
      newVal: this.groups.map(item => angular.copy(item.selected)),
      oldVal: oldValue
    });
  }

  /**
   * @ngdoc method
   * @methodOf osmMoveTo.MoveToCtrl
   * @name osmMoveTo.MoveToCtrl#loadMoveToGroups
   *
   * @param {number} groupIndex index of group
   * @param {string} type type of place (office, floor, area, etc...)
   *
   * @description This method loads groups for multiple select component
   */
  loadMoveToGroups(groupIndex = 0, type) {
    const query = this.moveToFct.getGroup(type);

    query
      .$promise
      .then(data => {
        if (groupIndex >= this.groups.length) {
          this.groups[groupIndex] = this.moveToFct.prepareGroup(data);
        } else {
          this.groups.push(this.moveToFct.prepareGroup(data));
        }
      });

    return query;
  }
}


/**
 * @ngdoc directive
 * @name osmMoveTo.osmMoveTo
 *
 * @scope
 * @property {string} ngModel link to related model
 *
 * @description
 * Component to render "Move To" field on request popup
 */
export default {
  templateUrl,
  controller  : MoveToCtrl,
  controllerAs: 'view',
  bindings    : {
    ngModel         : '<',
    onSelectCallback: '&onSelect'
  }
};
