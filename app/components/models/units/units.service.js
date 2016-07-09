/**
 * @ngdoc service
 * @name osmUnits.UnitsFct
 * @class
 * @extends $resource
 *
 * @description Model for units
 *
 */

// const useSever = true;

export default /*@ngInject*/$injector => {
  const $resource = $injector.get('$resource');
  // const Place     = $injector.get('PlacesFct');

  const Unit = $resource('{api}/units/:id', {
    id: '@id'
  }, {

    /**
     * @ngdoc method
     * @methodOf osmUnits.UnitsFct
     * @name osmUnits.UnitsFct#get
     * @restMethod GET
     *
     * @param {string} id
     *
     * @returns {$resource}
     *
     * @description return DTO of the unit.
     *              Owner id and name should
     *              be included.
     */
    get: {
      method: 'GET'
    },


    /**
     * @ngdoc method
     * @methodOf osmUnits.UnitsFct
     * @name osmUnits.UnitsFct#getCurrent
     * @restMethod GET
     *
     * @returns {$resource}
     *
     * @static
     * @description returns current path (list of entities) of
     *              currently logged in user. Each path entity
     *              should contain name, id and type properties.
     * @todo: rename to getCurrent when the server is ready
     */
    getCurrentServer: {
      method : 'GET',
      url    : '{api}/units/current',
      interceptor: {
        response(config) {
          // Place.transformPath(config.resource);

          return config.resource;
        }
      }
    },


    /**
     * @todo: remove when the server is ready
     */
    getCurrent: {
      method     : 'GET',
      url        : '/mock/NyCcENGB-',
      interceptor: {
        response(config) {
          // Place.transformPath(config.resource);

          return config.resource;
        }
      }
    },


    /**
     * @ngdoc method
     * @methodOf osmUnits.UnitsFct
     * @name osmUnits.UnitsFct#query
     * @restMethod GET
     *
     * @param {string} parent
     *
     * @returns {$resource}
     *
     * @description returns object with list of all children
     *              in the unit. Each children should contain
     *              type, name and id properties. Should return
     *              empty list for last tree level
     *              (for instance AREAS)
     */
    query: {
      method : 'GET',
      isArray: true
    },

    // -----------------------------------------
    // MOCK ACTIONS
    // -----------------------------------------

    getOfficesMock: {
      url    : '/mock/N1D4kURmZ',
      method : 'GET',
      isArray: true
    },

    getFloorsMock: {
      url    : '/mock/VyuEeUC7-',
      method : 'GET',
      isArray: true
    },

    getAreasMock: {
      url    : '/mock/Vy6xWUAQb',
      method : 'GET',
      isArray: true
    },

    getPlacesMock: {
      url    : '/mock/Vyop-LCXb',
      method : 'GET',
      isArray: true
    }
  });

  /**
   * @ngdoc method
   * @methodOf osmUnits.UnitsFct
   * @name osmUnits.UnitsFct#getChildren
   * @restMethod GET
   *
   * @param {Object} parameters Parameters for a call
   * @param {string|number} parameters.id Id of a unit to fetch children for
   *
   * @returns {$resource}
   *
   * @description Fetched all children units of the unit with id (one level only)
   */
  Unit.getChildren = function ({ id }) {
    return Unit.query({ parent: id });
  };


  angular.extend(Unit, {
    TYPE_LOCATION: 'PHYSICAL_COUNTRY',
    TYPE_CITY    : 'PHYSICAL_CITY',
    TYPE_OFFICE  : 'PHYSICAL_OFFICE',
    TYPE_FLOOR   : 'PHYSICAL_FLOOR',
    TYPE_AREA    : 'PHYSICAL_ROOM'
  });

  // -----------------------------------------
  // MOCK METHODS
  // -----------------------------------------

  Unit.getListByTypeMock = function (type) {
    const methodName = `get${ type.charAt(0).toUpperCase() }${ type.slice(1) }sMock`;

    return Unit[methodName]();
  };

  Unit.getByIdMock = function (type, id) {
    const items  = Unit.getListByTypeMock(type);
    const result = new Unit({});

    result.$promise = items.$promise.then(items => {
      const request = items.find(item => item.id === id);

      angular.extend(result, request);

      return request;
    });

    return result;
  };

  Unit.getPlaceResourcesMock = function (places) {
    return places.map(place => Unit.getByIdMock(place.type, place.id));
  };

  return Unit;
};
