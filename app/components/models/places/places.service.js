/**
 * @ngdoc service
 * @name osmPlaces.PlacesFct
 * @class
 * @extends $resource
 *
 * @description Model for places
 *
 */

export default /*@ngInject*/$resource => {
  const Place = $resource('{api}/places', {}, {

    /**
     * @ngdoc method
     * @methodOf osmEmployees.EmployeesFct
     * @name osmEmployees.EmployeesFct#query
     * @restMethod GET
     *
     * @param {string} ownerName
     * @param {string} unit
     *
     * @returns {$resource}
     *
     * @description Use either `ownerName` OR `unit` BUT NOT BOTH.
     *              returns list of places occupied by employee
     *              with names (aka suggestions). We need full
     *              telescope employee name, position and url of an
     *              avatar (list may change)
     *              OR
     *              returns list of places of the given unit.
     *              Unit can be office, floor, area etc.
     */
    query: {
      method : 'GET',
      isArray: true
    },

    /**
     * @ngdoc method
     * @methodOf osmEmployees.EmployeesFct
     * @name osmEmployees.EmployeesFct#get
     * @restMethod GET
     *
     * @param {string} ownerId
     *
     * @returns {$resource}
     *
     * @description returns place occupied by employee with id.
     */
    get: {
      method: 'GET'
    }
  });

  Place.TYPE = 'PHYSICAL_PLACE';


  /**
   * @ngdoc method
   * @methodOf osmEmployees.EmployeesFct
   * @name osmEmployees.EmployeesFct#transformPath
   *
   * @param {Array.<Object>} path Path to the place
   *
   * @description Transforms path to the place by adding type to the place
   */
  Place.transformPath = function (path) {
    const placeIndex = path.length - 1;

    path[placeIndex].type = Place.TYPE;
  };

  //methods

  return Place;
};
