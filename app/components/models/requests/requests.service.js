import angular from 'angular';

const useServer   = true;
const countHeader = 'X-Count';

/**
 * @ngdoc service
 * @name osmRequests.RequestsFct
 *
 * @description Model for requests. Returns Request model
 */
export default /*@ngInject*/($resource, EmployeesFct) => {
  /**
   * @ngdoc service
   * @name osmRequests.Request
   * @class
   * @extends $resource
   *
   * @description Model for requests. Returned by RequestsFct
   */
  const Request = $resource('{api}/requests/:id', {
    id: '@id'

  }, {

    /**
     * @ngdoc property
     * @propertyOf osmRequests.Request
     * @name osmRequests.Request#state
     * @type {string}
     *
     * @description Holds current state
     */
    /**
     * @ngdoc property
     * @propertyOf osmRequests.Request
     * @name osmRequests.Request#id
     * @type {string}
     *
     * @description Holds id
     */
    /**
     * @ngdoc property
     * @propertyOf osmRequests.Request
     * @name osmRequests.Request#type
     * @type {string}
     *
     * @description Holds type of request
     */
    /**
     * @ngdoc property
     * @propertyOf osmRequests.Request
     * @name osmRequests.Request#inProgressType
     * @type {string}
     *
     * @description Holds in progress type of a request
     */
    /**
     * @ngdoc property
     * @propertyOf osmRequests.Request
     * @name osmRequests.Request#actions
     * @type {Array<string>}
     *
     * @description Holds actions can be performed on a request
     */

    /**
     * @ngdoc method
     * @methodOf osmRequests.Request
     * @name osmRequests.Request#query
     * @restMethod GET
     *
     * @returns {$resource}
     *
     * @static
     * @description returns list of requests. Should contain
     *              total number of requests suited to filters
     */
    query: {
      method     : 'GET',
      isArray    : true,
      interceptor: {
        response(config) {
          config.resource.totalListItemsAmount = config.headers(countHeader) || 10; //TODO: Remove 10 value here
          Request.transformStatesInList(config.resource);

          return config.resource;
        }
      }
    },

    /**
     * @ngdoc method
     * @methodOf osmRequests.Request
     * @name osmRequests.Request#save
     * @restMethod POST
     *
     * @param {string} type
     *
     * @returns {$resource}
     *
     * @description creates the request on the server
     *              (type="SWAP" or "MOVEMENT" is required).
     *              Returns created request DTO with id
     */
    save: {
      method          : 'POST',
      transformRequest: data => angular.toJson({
        type: data && data.type || 'SWAP' // 'MOVEMENT'
      })
    },

    /**
     * @ngdoc method
     * @methodOf osmRequests.Request
     * @name osmRequests.Request#get
     * @restMethod GET
     *
     * @param {string} id
     *
     * @returns {$resource}
     *
     * @description returns request DTO.
     */
    get: {
      method     : 'GET',
      interceptor: {
        response(config) {
          //TODO: remove after server response fixed
          if (config.resource.status) {
            config.resource.state = config.resource.status;
          }

          Request.transformState(config.resource);

          return config.resource;
        }
      }
    },

    /**
     * @ngdoc method
     * @methodOf osmRequests.Request
     * @name osmRequests.Request#edit
     * @restMethod PUT
     *
     * @param {string} id
     *
     * @returns {$resource}
     *
     * @description edits the request. Returns new request DTO.
     */
    edit: {
      method: 'PUT'
    },

    /**
     * @ngdoc method
     * @methodOf osmRequests.Request
     * @name osmRequests.Request#cancel
     * @restMethod PUT
     *
     * @param {string} id
     * @param {string} type
     *
     * @returns {$resource}
     *
     * @description the way to cancel the request ??
     */
    cancel: {
      method: 'PUT',
      params: {
        type: 'cancelled'
      }
    },

    /**
     * @ngdoc method
     * @methodOf osmRequests.Request
     * @name osmRequests.Request#save
     * @restMethod POST
     *
     * @param {string} id
     *
     * @returns {$resource}
     *
     * @description the way to approve the request (SWAP) ??
     */
    approve: {
      method: 'POST',
      url   : '{api}/requests/:id/confirmation'
    },

    /**
     * @ngdoc method
     * @methodOf osmRequests.Request
     * @name osmRequests.Request#remove
     * @restMethod DELETE
     *
     * @param {string} id
     *
     * @returns {$resource}
     *
     * @static
     * @description deletes the request. Returns 200 status only
     */

    /**
     * @ngdoc method
     * @methodOf osmRequests.Request
     * @name osmRequests.Request#$remove
     * @restMethod DELETE
     *
     * @param {string} id
     *
     * @returns {$resource}
     *
     * @description deletes the request. Returns 200 status only
     */
    remove: {
      method: 'DELETE'
    },

    // -----------------------------------------
    // MOCK ACTIONS
    // -----------------------------------------

    queryMock: {
      method     : 'GET',
      url        : '/mock/EJ_uYvoNW',
      isArray    : true,
      interceptor: {
        response(config) {
          // TODO: For test purpose only (replace it with header value from config)
          config.resource.totalListItemsAmount = 77;

          return config.resource;
        }
      }
    },

    approveMock: {
      url    : '/mock/EJ_uYvoNW',
      method : 'GET',
      isArray: true,
      params : {
        action: 'approve'
      }
    },

    closeMock: {
      url    : '/mock/EJ_uYvoNW',
      method : 'GET',
      isArray: true,
      params : {
        action: 'close'
      }
    },

    deleteMock: {
      url    : '/mock/EJ_uYvoNW',
      method : 'GET',
      isArray: true,
      params : {
        action: 'delete'
      }
    },

    approveMockMulti: {
      url    : '/mock/EJ_uYvoNW',
      method : 'GET',
      isArray: true
    },

    closeMockMulti: {
      url    : '/mock/EJ_uYvoNW',
      method : 'GET',
      isArray: true
    },

    queryHistoryMock: {
      method : 'GET',
      isArray: true,
      url    : '/mock/VJOcH3-BZ'
    },

    queryGraphMock: {
      method : 'GET',
      isArray: true,
      url    : '/mock/VJjYFU7Bb'
    }
  });


  /**
   * @ngdoc method
   * @methodOf osmRequests.Request
   * @name osmRequests.Request#create
   *
   * @param {Object} params Params for request instance
   *
   * @static
   * @returns {Request} Instance of the request
   */
  Request.create = function (params) {
    const defaultParams = {
      employee: EmployeesFct.getByIdMock(0)
    };

    return new Request(angular.extend(defaultParams, params));
  };


  /**
   * @ngdoc method
   * @methodOf osmRequests.Request
   * @name osmRequests.Request#transformState
   *
   * @param {Request} request Request to transform
   *
   * @static
   * @description Transforms state and add inProgressType if needed
   */
  Request.transformState = function (request) {
    if (request.state.startsWith('IN_PROGRESS')) {
      request.inProgressType = request.state.replace('IN_PROGRESS', '').slice(1) || 'VALID';
      request.state          = 'IN_PROGRESS';
    }
  };


  /**
   * @ngdoc method
   * @methodOf osmRequests.Request
   * @name osmRequests.Request#transformStatesInList
   *
   * @param {Array.<Request>} list List of requests to transform
   *
   * @static
   * @description Transforms state of requests in the list
   */
  Request.transformStatesInList = function (list) {
    list.forEach(Request.transformState);
  };


  /**
   * @ngdoc method
   * @methodOf osmRequests.Request
   * @name osmRequests.Request#getPage
   *
   * @param {Object} [parameters = {}] List of requests to transform
   *
   * @static
   * @returns {Array.<Request>}
   */
  Request.getPage = function (parameters = {}) {
    //TODO: Remove this temp functionality
    if (!useServer) {
      return Request.getPageMock(parameters);
    }

    const params = angular.copy(parameters);

    if (params.state) {
      params.state = params.state.toUpperCase();
    }

    return Request.query(params);
  };


  /**
   * @ngdoc method
   * @methodOf osmRequests.Request
   * @name osmRequests.Request#filterToApprove
   *
   * @param {Array.<Request>} requests Array of selected requests
   * @returns {Array.<Request>} Array of requests to approve
   *
   * @static
   * @description Filters requests - returns only requests that can be approved
   */
  Request.filterToApprove = function (requests) {
    return requests.filter(request =>
    request.actions && request.actions.includes('APPROVE'));
  };


  Request.TYPE_SWAP     = 'request_swap';
  Request.TYPE_MOVEMENT = 'request_movement';


  // -----------------------------------------
  // MOCK METHODS
  // -----------------------------------------

  Request.getByIdMock = function (id) {
    const requests = Request.queryMock();
    const result   = new Request({});

    result.$promise = requests.$promise.then(requests => {
      const request = requests.find(request => request.id === id);

      angular.extend(result, request);

      return request;
    });

    return result;
  };


  Request.getPageMock = function (parameters = {}) {
    const { sortBy, pageNumber, pageSize } = parameters;
    const sortOrder   = parameters.sortOrder.toUpperCase();
    const startNumber = pageSize * (pageNumber - 1);
    const requests    = Request.queryMock();
    const result      = [];

    result.$promise = requests.$promise
      .then(data => {
        result.totalListItemsAmount = data.totalListItemsAmount;

        return data.slice(startNumber, startNumber + pageSize)
          .sort(({ [sortBy]: valueA }, { [sortBy]: valueB }) => {
            if (sortOrder === 'DESC') {
              [valueA, valueB] = [valueB, valueA];
            }

            if (valueA > valueB) {
              return 1;
            }

            if (valueA < valueB) {
              return -1;
            }

            return 0;
          });
      })
      .then(data => {
        data.totalListItemsAmount = result.totalListItemsAmount;

        data.forEach((data, index) => {
          result[index] = data;
        });

        return data;
      });

    return result;
  };

  Request.executeMock = function (action, id) {
    return this[`${ action }Mock`]({ id }).$promise;
  };

  Request.executeMultipleMock = function (action/*, requests*/) {
    //TODO: uncomment requests when server is ready
    return this[`${ action }MockMulti`]({ /*requests*/ }).$promise;
  };

  // -----------------------------------------
  // MOCK METHODS END
  // -----------------------------------------

  return Request;
};
