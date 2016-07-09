import angular from 'angular'; // eslint-disable-line
/**
 * @ngdoc service
 * @name osmViewOfficeModels.modelAreaFct
 * @class
 * @extends $resource
 *
 * @description Model for office areas
 *
 */

// TODO - fake data - replace it with the real one
export default /*@ngInject*/$resource => {
  const Request = $resource('http://www.json-generator.com/api/json/get/cnBqWmHvSa');

  //TODO: This is a mock method
  Request.getById = function (id) {
    const requests = Request.query();
    const result   = new Request({});

    result.$promise = requests.$promise.then(requests => {
      const request = requests.find(request => request.id === id);

      angular.extend(result, request);

      return request;
    });

    return result;
  };

  return Request;
};
