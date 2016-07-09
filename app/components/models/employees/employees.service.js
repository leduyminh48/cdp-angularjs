/**
 * @ngdoc service
 * @name osmEmployees.EmployeesFct
 *
 * @description Returns Employee model
 *
 */

export default /*@ngInject*/$resource => {
  /**
   * @ngdoc service
   * @name osmEmployees.Employee
   * @class
   * @extends $resource
   *
   * @description Model for employees
   *
   */
  const Employee = $resource('{api}/employees', {}, {

    /**
     * @ngdoc service
     * @name osmEmployees.Employee
     * @class
     * @extends $resource
     *
     * @description Employee model. Is returned by EmployeesFct
     */

    /**
     * @ngdoc method
     * @methodOf osmEmployees.Employee
     * @name osmEmployees.Employee#queryAccessible
     * @restMethod GET
     *
     * @returns {$resource}
     *
     * @static
     * @description returns list of employees accessible (not restricted by role)
     */
    queryAccessible: {
      url    : '{api}/employees/accessible',
      method : 'GET',
      isArray: true
    },

    // -----------------------------------------
    // MOCK ACTIONS
    // -----------------------------------------

    queryMock: {
      method : 'GET',
      url    : '/mock/VJrZZNbV-',
      isArray: true
    },

    queryMockCurrent: {
      method : 'GET',
      url    : '/mock/VJ9N2BX8Z'
    }
  });


  /**
   * @ngdoc method
   * @methodOf osmEmployees.Employee
   * @name osmEmployees.Employee#search
   * @restMethod GET
   *
   * @param {string} searchString String to search by
   * @returns {Array.<Employee>}
   *
   * @static
   * @description returns list of employees by search string
   */
  Employee.search = function (searchString) {
    return Employee.query({ name: searchString });
  };


  /**
   * @ngdoc method
   * @methodOf osmEmployees.Employee
   * @name osmEmployees.Employee#searchAccessible
   * @restMethod GET
   *
   * @param {string} searchString String to search by
   * @returns {Array.<Employee>}
   *
   * @static
   * @description returns list of employees accessible by search string (not restricted by role)
   */
  Employee.searchAccessible = function (searchString) {
    return Employee.queryAccessible({ name: searchString });
  };

  // -----------------------------------------
  // MOCK METHODS
  // -----------------------------------------

  Employee.getByIdMock = function (index) {
    const persons = Employee.queryMock();
    const result  = new Employee({});

    result.$promise = persons.$promise.then(users => {
      const person = users.find(person => person.index === index);

      angular.extend(result, person);

      return person;
    });

    return result;
  };


  return Employee;
};
