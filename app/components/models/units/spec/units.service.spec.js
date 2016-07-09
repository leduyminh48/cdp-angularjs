import angular from 'angular';
import module from '../';

describe('Model Factory: UnitsFct', () => {
  const id = 125;
  let $httpBackend;
  let Model;

  beforeEach(angular.mock.module(module));

  beforeEach(inject($injector => {
    $httpBackend = $injector.get('$httpBackend');
    Model        = $injector.get('UnitsFct');
  }));


  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('#get', () => {
    it('should perform right request with params', () => {
      $httpBackend
        .expectGET(`{api}/units/${ id }`)
        .respond(200, '');

      Model.get({ id });
      $httpBackend.flush();
    });
  });


  describe('#getCurrent', () => {
    it('should perform right request without params', () => {
      $httpBackend
        .expectGET('{api}/units/current')
        .respond(200, '{}');

      Model.getCurrentServer();
      $httpBackend.flush();
    });
  });


  describe('#query', () => {
    it('should perform right request with params', () => {
      $httpBackend
        .expectGET('{api}/units')
        .respond(200, '');

      Model.query();
      $httpBackend.flush();
    });
  });


  describe('#getChildren', () => {
    it('should perform right request with params', () => {
      $httpBackend
        .expectGET(`{api}/units?parent=${ id }`)
        .respond(200, '');

      Model.getChildren({ id });
      $httpBackend.flush();
    });
  });
});
