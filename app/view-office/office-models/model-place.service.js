import angular from 'angular';

/**
 * @ngdoc service
 * @name osmViewOfficeModels.modelPlacesFct
 * @class
 * @extends $resource
 *
 * @description Model for offices places
 */

// TODO - fake data - replace it with the real one
export default /*@ngInject*/$resource => {
  const Request = $resource('http://www.json-generator.com/api/json/get/cjEaERTadK');

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
