/**
 * @ngdoc overview
 * @name osmMultipleSelectUnits.UnitSelectFct
 * @class
 *
 * @description
 * Factory for holding units multiple select component logic
 */
export default /*@ngInject*/$injector => {
  const Units  = $injector.get('UnitsFct');
  const Places = $injector.get('PlacesFct');
  const $q     = $injector.get('$q');

  class UnitSelect {
    constructor({ initType, startType = Units.TYPE_LOCATION, finishType = Places.TYPE } = {}) {
      this.initType   = initType;
      this.startType  = startType;
      this.finishType = finishType;
    }


    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelectUnits.UnitSelectFct
     * @name osmMultipleSelectUnits.UnitSelectFct#init
     *
     * @param {Array.<Object>} units Array of units to init
     *
     * @returns {Promise} Promise for loading init info
     *
     * @description Fulfills units array with init position or does nothing if it is filled
     */
    init(units) {
      if (!this.initType) {
        return $q.resolve(units);
      }

      return Units.getCurrent().$promise
        .then(currentUnits => this.initCurrentUnitsByTypes(currentUnits, units))
        .then(() => units);
    }


    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelectUnits.UnitSelectFct
     * @name osmMultipleSelectUnits.UnitSelectFct#initCurrentUnitsByTypes
     *
     * @param {Array.<Object>} currentUnits Array of current units
     * @param {Array} units Empty array to fill with current units
     *
     * @private
     * @description Fulfills units with current units from this.startType till this.initType
     */
    initCurrentUnitsByTypes(currentUnits, units) {
      const startUnit   = currentUnits.find(unit => unit.type === this.startType);
      const startIndex  = currentUnits.indexOf(startUnit);
      const finishUnit  = currentUnits.find(unit => unit.type === this.initType);
      const finishIndex = currentUnits.indexOf(finishUnit);


      currentUnits.slice(startIndex, finishIndex + 1)
        .forEach(unit => {
          units.push({
            selected: unit,
            list    : []
          });
        });
    }


    /**
     * @ngdoc property
     * @propertyOf osmMultipleSelectUnits.UnitSelectFct
     * @name osmMultipleSelectUnits.UnitSelectFct#getChildren
     *
     * @param {string|number} id Id f the unit to get children for
     * @param {string} type Type of the unit to get children for
     * @returns {Promise} Promise for loading
     *
     * @description Gets children (units or places) for current selected unit.
     * If it is a unit with finishType type, it returns promise resolved with null
     */
    getChildren({ id, type }) {
      if (type === this.finishType) {
        return $q.resolve(null);
      }

      return Units.getChildren({ id })
        .$promise
        .then(children => {
          if (children && children.length) {
            return children;
          }

          return Places.getForUnit({ id }).$promise;
        });
    }
  }


  return {
    /**
     * @ngdocs method
     * @methodOf osmMultipleSelectUnits.UnitSelectFct
     * @name osmMultipleSelectUnits.UnitSelectFct#create
     *
     * @returns {UnitSelect}
     * @description Returns new instance of unit selector
     */
    create(parameters) {
      return new UnitSelect(parameters);
    }
  };
};
