import angular from 'angular';
import module from '../';

describe('Model Factory: PlacesFct', () => {
  const name = 'John';
  const id = 123;
  let $httpBackend;
  let model;

  beforeEach(angular.mock.module(module));

  beforeEach(inject($injector => {
    $httpBackend = $injector.get('$httpBackend');
    model = $injector.get('PlacesFct');
  }));

  afterEach(() => {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#query', () => {
    it('should perform right request when `ownerName` given', () => {
      $httpBackend
        .expectGET(`{api}/places?ownerName=${ name }`)
        .respond(200, '');
      model.query({ ownerName: name });
    });

    it('should perform right request when `unit` given', () => {
      $httpBackend
        .expectGET(`{api}/places?unit=${ id }`)
        .respond(200, '');
      model.query({ unit: id });
    });
  });

  describe('#get', () => {
    it('should perform right request with params', () => {
      $httpBackend
        .expectGET(`{api}/places?ownerId=${ id }`)
        .respond(200, '');
      model.get({ ownerId: id });
    });
  });
});
