import angular from 'angular';

import MoveToComponent from './move-to/move-to.component';

/**
 * @ngdoc controller
 * @name osmViewRequestPopup.ViewRequestsPopupCtrl
 * @class
 *
 * @description Controller for request popup view
 */
export default class {
  /*@ngInject*/
  constructor($injector, request) {
    this.$q       = $injector.get('$q');
    this.$timeout = $injector.get('$timeout');

    this.requestPopup = $injector.get('requestPopupFct');
    this.Employees    = $injector.get('EmployeesFct');

    this.request    = request;
    this.MoveToCtrl = MoveToComponent.controller;
    /**
     * @todo: Temporary solution, need to rework initialization
     */
    this.$initialize();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestPopup.ViewRequestsPopupCtrl
   * @name osmViewRequestPopup.ViewRequestsPopupCtrl#$initialize
   *
   * @description Initialization method
   */
  $initialize() {
    //TODO: this is a mock solution
    if (!this.request.employee) {
      angular.extend(this.request, {
        employee: this.Employees.getByIdMock(0),
        occupied: this.requestPopup.getOccupiedBy()
      });
    }

    if (this.request.occupied) {
      this.request.occupied
        .$promise
        .then(person => {
          this.occupiedByName = person;
        });
    }

    this.request.employee.$promise.then(person => {
      this.employeeName = person.fullname;
      this.updateEmployeePlace(person);
    });
  }

  searchEmployee(query) {
    return this.Employees.search(query).$promise;
  }

  searchAccessible(query) {
    return this.Employees.searchAccessible(query).$promise;
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestPopup.ViewRequestsPopupCtrl
   * @name osmViewRequestPopup.ViewRequestsPopupCtrl#onEmployeeChanged
   *
   * @description Handler for on-change event of "Employee" field
   */
  onEmployeeChanged() {
    delete this.request.employee;
    delete this.request.from;
    delete this.currentRoomOwner;
    delete this.currentLocation;
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestPopup.ViewRequestsPopupCtrl
   * @name osmViewRequestPopup.ViewRequestsPopupCtrl#employeeSelected
   *
   * @param {Object} person person resource
   *
   * @description Handler for on-select event of "Employee" field
   */
  employeeSelected(person) {
    this.request.employee = person;
    this.updateEmployeePlace(person);
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestPopup.ViewRequestsPopupCtrl
   * @name osmViewRequestPopup.ViewRequestsPopupCtrl#onOccupiedByChanged
   *
   * @description Handler for on-change event of "Occupied By" field
   */
  onOccupiedByChanged() {
    delete this.request.occupied;
    delete this.request.to;
    delete this.targetRoomOwner;
    delete this.targetLocation;
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestPopup.ViewRequestsPopupCtrl
   * @name osmViewRequestPopup.ViewRequestsPopupCtrl#occupiedBySelected
   *
   * @param {Object} [person] person resource
   *
   * @description Handler for on-select event of "Occupied By" field
   */
  occupiedBySelected(person) {
    if (!person) {
      this.onOccupiedByChanged();

      return;
    }

    this.request.occupied = person;
    this.request.to       = this.requestPopup.prepareMoveTo(person.place);
    this.targetLocation   = person.place.map(placeItem => placeItem.name);
    this.targetRoomOwner  = this.requestPopup.getRoomOwner();
    this.occupiedByName   = person.fullname;
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestPopup.ViewRequestsPopupCtrl
   * @name osmViewRequestPopup.ViewRequestsPopupCtrl#updateEmployeePlace
   *
   * @param {Object} [person] person resource
   *
   * @description This method updates the selected employee's place
   */
  updateEmployeePlace(person) {
    if (!person) {
      this.onEmployeeChanged();

      return;
    }

    this.request.from    = person.place;
    this.currentLocation = person.place.map(placeItem => {
      if (placeItem.type === 'area') {
        this.currentRoomOwner = this.requestPopup.getRoomOwner();
      }

      return placeItem.name;
    });
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestPopup.ViewRequestsPopupCtrl
   * @name osmViewRequestPopup.ViewRequestsPopupCtrl#updateOccupiedBy
   *
   * @description This method updates an owner of the employee's target place
   */
  updateOccupiedBy() {
    if (this.request.to.length === this.MoveToCtrl.MAX_NUMBER_OF_GROUPS) {
      this.requestPopup.getOccupiedBy()
        .$promise
        .then(person => {
          this.request.occupied = person;
          this.occupiedByName   = this.request.occupied.fullname;
        });
    } else {
      delete this.request.occupied;
      this.occupiedByName = '';
    }
  }


  onMoveToSelected(newValue, oldValue) {
    this.request.to = newValue;

    if (!angular.equals(newValue, oldValue)) {
      const area = this.requestPopup.getAreaFromPlaceArray(newValue);

      if (area) {
        this.targetRoomOwner = this.requestPopup.getRoomOwner();
      } else {
        delete this.targetRoomOwner;
      }

      this.updateOccupiedBy();
    }
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestPopup.ViewRequestsPopupCtrl
   * @name osmViewRequestPopup.ViewRequestsPopupCtrl#onSubmit
   *
   * @description Handler for submitting a form
   */
  onSubmit() {
    return this.$q(resolve => this.$timeout(resolve, 2000));
  }
}
