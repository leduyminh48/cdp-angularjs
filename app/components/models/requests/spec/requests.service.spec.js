import angular from 'angular';
import module from '../';

describe('Model Factory: RequestsFct', () => {
  const id = 125;
  let $httpBackend;
  let model;

  beforeEach(angular.mock.module(module));

  beforeEach(inject($injector => {
    $httpBackend = $injector.get('$httpBackend');
    model        = $injector.get('RequestsFct');
  }));


  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('#getPage', () => {
    it('should perform right request without params', () => {
      /* eslint max-nested-callbacks: "off" */
      $httpBackend
        .expectGET(url => (
          /^{api}\/requests/.test(url)
        ))
        .respond(200, '');

      model.getPage();
      $httpBackend.flush();
    });


    it('should transform state to uppercase when sending to the server', () => {
      $httpBackend
        .expectGET('{api}/requests?state=ACTIVE')
        .respond(200, '');

      model.getPage({ state: 'active' });

      $httpBackend.flush();
    });


    it('should transform "IN_PROGRESS" state of a list of elements', () => {
      $httpBackend
        .whenGET('{api}/requests')
        .respond(200, '[{ "state": "IN_PROGRESS" }]');

      const result = model.getPage();

      $httpBackend.flush();
      expect(result[0].state).toBe('IN_PROGRESS');
      expect(result[0].inProgressType).toBe('VALID');
    });


    it('should transform "IN_PROGRESS_BLOCKED" state of a list of elements', () => {
      $httpBackend
        .whenGET('{api}/requests')
        .respond(200, '[{ "state": "IN_PROGRESS_BLOCKED" }]');

      const result = model.getPage();

      $httpBackend.flush();
      expect(result[0].state).toBe('IN_PROGRESS');
      expect(result[0].inProgressType).toBe('BLOCKED');
    });


    it('should transform "PENDING"  state of a list of elements', () => {
      $httpBackend
        .whenGET('{api}/requests')
        .respond(200, '[{ "state": "PENDING" }]');

      const result = model.getPage();

      $httpBackend.flush();
      expect(result[0].state).toBe('PENDING');
    });
  });


  describe('#save', () => {
    it('should perform right request without params', () => {
      $httpBackend
        .expectPOST('{api}/requests', '{"type":"SWAP"}')
        .respond(200, '');

      model.save();
      $httpBackend.flush();
    });

    it('should perform right request with params', () => {
      $httpBackend
        .expectPOST('{api}/requests', '{"type":"MOVEMENT"}')
        .respond(200, '');

      model.save({}, { type: 'MOVEMENT' });
      $httpBackend.flush();
    });
  });


  describe('#get', () => {
    it('should perform right request with params', () => {
      $httpBackend
        .expectGET(`{api}/requests/${ id }`)
        .respond(200, '{ "status": "", "state": "" }');

      model.get({ id });
      $httpBackend.flush();
    });
  });


  describe('#edit', () => {
    it('should perform right request with params', () => {
      $httpBackend
        .expectPUT(`{api}/requests/${ id }`)
        .respond(200, '');

      model.edit({ id });
      $httpBackend.flush();
    });
  });


  describe('#cancel', () => {
    it('should perform right request with params', () => {
      $httpBackend
        .expectPUT(`{api}/requests/${ id }?type=cancelled`)
        .respond(200, '');

      model.cancel({ id });
      $httpBackend.flush();
    });
  });


  describe('#approve', () => {
    it('should perform right request with params', () => {
      $httpBackend
        .expectPOST(`{api}/requests/${ id }/confirmation`)
        .respond(200, '');

      model.approve({ id });
      $httpBackend.flush();
    });
  });


  describe('#remove', () => {
    it('should perform right request with params', () => {
      $httpBackend
        .expectDELETE(`{api}/requests/${ id }`)
        .respond(200, '');

      model.remove({ id });
      $httpBackend.flush();
    });
  });
});
