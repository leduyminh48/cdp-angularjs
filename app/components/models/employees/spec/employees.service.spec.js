import angular from 'angular';
import module from '../';

describe('Model Factory: EmployeesFct', () => {
  const searchString = 'John';
  let $httpBackend;
  let model;

  beforeEach(angular.mock.module(module));


  beforeEach(inject($injector => {
    $httpBackend = $injector.get('$httpBackend');
    model        = $injector.get('EmployeesFct');
  }));


  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('#query', () => {
    it('should perform right query() request', () => {
      $httpBackend
        .expectGET('{api}/employees')
        .respond(200, '');

      model.query();
      $httpBackend.flush();
    });

    it('should perform right request with params on search()', () => {
      $httpBackend
        .expectGET(`{api}/employees?name=${ searchString }`)
        .respond(200, '');

      model.search(searchString);
      $httpBackend.flush();
    });
  });


  it('should perform right request with params on searchAccessible', () => {
    $httpBackend
      .expectGET(`{api}/employees/accessible?name=${ searchString }`)
      .respond(200, '');

    model.searchAccessible(searchString);
    $httpBackend.flush();
  });
});
