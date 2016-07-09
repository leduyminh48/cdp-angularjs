/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../modals.module';


describe('Service: osmModals', () => {
  let osmModalsFct;
  let scope;
  let modalParams;

  const $uibModal = {
    open: jasmine.createSpy('$uibModalOpen').and
      .callFake(params => {
        modalParams = params;
      })
  };

  beforeEach(angular.mock.module(module, $provide => {
    $provide.constant('$uibModal', $uibModal);
  }));

  beforeEach(inject((_osmModalsFct_, _$rootScope_) => {
    osmModalsFct = _osmModalsFct_;
    scope        = _$rootScope_.$new();
    scope.$apply();
  }));


  afterEach(() => {
    $uibModal.open.calls.reset();
  });


  describe('Open', () => {
    beforeEach(() => {
      osmModalsFct.open();
    });


    it('should call $uibModal open method', () => {
      expect($uibModal.open).toHaveBeenCalled();
    });


    it('should set modal bindings into an object on the scope', () => {
      expect(modalParams.scope.osmModal).toEqual(jasmine.any(Object));
    });
  });


  describe('Confirmation', () => {
    beforeEach(() => {
      osmModalsFct.confirm();
    });


    it('should call $uibModal open method', () => {
      expect($uibModal.open).toHaveBeenCalled();
    });
  });
});
