import angular from 'angular';

/**
 * @ngdoc controller
 * @name osmMultipleSelect.MultipleSelectCtrl
 * @class
 *
 * @description Controller for multiple select component
 */
export default class {
  /*@ngInject*/
  constructor($attrs) {
    this.required = angular.isDefined($attrs.required);
    this.title    = this.title    || 'title';
    this.name     = this.name     || 'multiSelect';
    this.onSelect = this.onSelect || angular.noop;

    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelect.MultipleSelectCtrl
     * @name osmMultipleSelect.MultipleSelectCtrl#ngModel
     *
     * @type {Object}
     *
     * @description Instance of the ngModel controller
     */
  }


  $postLink() {
    this.setInvalid();
  }


  $onChange() {
  }


  /**
   * @ngdoc method
   * @methodOf osmMultipleSelect.MultipleSelecztCtrl
   * @name osmMultipleSelect.MultipleSelectCtrl#onDropdownSelect
   *
   * @param {Object} group Group (dropdown object) on which selection is being performed
   * @param {Object} item Selected item
   *
   * @description Selects item in a dropdown
   */
  onDropdownSelect(group, item) {
    if (group.selected === item) {
      return;
    }

    const groupIndex = this.getGroupIndex(group);

    group.selected = item;

    this.selectGroupInTheMiddle(groupIndex);
    const result = this.onSelect({ groupIndex, item });

    if (result) {
      this.setValid();
    } else {
      this.setInvalid();
    }
  }


  /**
   * @ngdoc method
   * @methodOf osmMultipleSelect.MultipleSelectCtrl
   * @name osmMultipleSelect.MultipleSelectCtrl#getGroupIndex
   *
   * @param {Object} group group to get index for
   * @returns {number} Index of the group
   *
   * @description Gets index of the given group in list of groups
   */
  getGroupIndex(group) {
    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelect.MultipleSelectCtrl
     * @name osmMultipleSelect.MultipleSelectCtrl#groups
     * @type {Array.<Object>}
     *
     * @description List of groups to select from
     */
    return this.groups.indexOf(group);
  }


  /**
   * @ngdoc method
   * @methodOf osmMultipleSelect.MultipleSelectCtrl
   * @name osmMultipleSelect.MultipleSelectCtrl#isModel
   *
   * @param {Object} [group] Group to perform checking for
   * @returns {boolean} True if a model
   *
   * @description Checks whether the group is a model
   */
  isModel(group) {
    return !!group && !angular.isArray(group.list);
  }


  /**
   * @ngdoc method
   * @methodOf osmMultipleSelect.MultipleSelectCtrl
   * @name osmMultipleSelect.MultipleSelectCtrl#isList
   *
   * @param {Object} [group] Group to perform checking for
   * @returns {boolean} True if a list
   *
   * @description Checks whether the group is a list
   */
  isList(group) {
    return !!group && angular.isArray(group.list);
  }


  /**
   * @ngdoc method
   * @methodOf osmMultipleSelect.MultipleSelectCtrl
   * @name osmMultipleSelect.MultipleSelectCtrl#selectGroupInTheMiddle
   *
   * @param {number} groupIndex Index of the group
   *
   * @description Performs action if group in the middle is selected. Typically we should remove all groups after it
   */
  selectGroupInTheMiddle(groupIndex) {
    if (groupIndex < this.groups.length - 1) {
      this.groups.length = groupIndex + 1;
    }
  }


  /**
   * @ngdoc method
   * @methodOf osmMultipleSelect.MultipleSelectCtrl
   * @name osmMultipleSelect.MultipleSelectCtrl#setInvalid
   *
   * @description
   */
  setInvalid() {
    if (this.required) {
      this.ngModel.$setValidity(this.name, false);
    }
  }


  /**
   * @ngdoc method
   * @methodOf osmMultipleSelect.MultipleSelectCtrl
   * @name osmMultipleSelect.MultipleSelectCtrl#setValid
   *
   * @description
   */
  setValid() {
    if (this.required) {
      this.ngModel.$setValidity(this.name, true);
    }
  }
}
