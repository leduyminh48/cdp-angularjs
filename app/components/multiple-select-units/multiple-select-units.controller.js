/**
 * @ngdoc controller
 * @name osmMultipleSelectUnits.MultipleSelectUnitsCtrl
 * @class
 *
 * @description Controller for osmMultipleSelectUnits component
 */
export default class {
  /*@ngInject*/
  constructor($injector, $attrs) {
    this.required      = angular.isDefined($attrs.required);
    this.UnitSelectFct = $injector.get('UnitSelectFct');
    this.title         = 'name';
    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelectUnits.MultipleSelectUnitsCtrl
     * @name osmMultipleSelectUnits.MultipleSelectUnitsCtrl#onChange
     *
     * @type {Function}
     * @description Handler on change (binding)
     */

    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelectUnits.MultipleSelectUnitsCtrl
     * @name osmMultipleSelectUnits.MultipleSelectUnitsCtrl#onFinish
     *
     * @type {Function}
     * @description Handler on finish (binding)
     */

    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelectUnits.MultipleSelectUnitsCtrl
     * @name osmMultipleSelectUnits.MultipleSelectUnitsCtrl#units
     *
     * @type {Array.<Object>}
     * @description Units array (binding)
     */
  }

  $onInit() {
    this.selector = this.UnitSelectFct.create(this);

    if (this.units && !this.units.length) {
      this.selector.init(this.units);
    }
  }


  /**
   * @ngdoc method
   * @methodOf osmMultipleSelectUnits.MultipleSelectUnitsCtrl
   * @name osmMultipleSelectUnits.MultipleSelectUnitsCtrl#$onChanges
   *
   * @description On changes component hook
   */
  $onChanges() {

  }


  /**
   * @ngdoc method
   * @methodOf osmMultipleSelectUnits.MultipleSelectUnitsCtrl
   * @name osmMultipleSelectUnits.MultipleSelectUnitsCtrl#onSelect
   *
   * @param {number} index Index of selected group
   * @param {Object} item Selected item
   *
   * @description On select callback
   */
  onSelect(index, item) {
    if (index >= this.units.length) {
      return;
    }

    this.selector.getChildren(item)
      .then(children => {
        if (!children) {
          this.onFinish();

          return;
        }


        this.units[index + 1] = { list: children };
        this.onChange();
      });
  }
}
