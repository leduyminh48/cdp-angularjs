/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
/*import angular  from 'angular';
import module   from './move-to.module';


describe('Component: osm-move-to', () => {
  let $componentController;
  let scope;
  let moveToFct;

  beforeEach(angular.mock.module(module));

  beforeEach(inject(_moveToFct_ => {
    moveToFct = _moveToFct_;
  }));

  beforeEach(inject((_$componentController_, _$rootScope_) => {
    $componentController = _$componentController_;
    scope                = _$rootScope_.$new();
  }));


  it('should define component', () => {
    const instance = $componentController('osmMoveTo', scope);

    expect(instance).toBeDefined();
  });


  describe('Providing links', () => {
    let instance;
    let bindings;

    beforeEach(() => {
      bindings = {};
      instance = $componentController('osmPersonTelescopeLink', scope, bindings);

      instance.$onChanges({
        name: { currentValue: 'Foo Bar' }
      });
    });

    afterEach(() => {
      moveToFct.getToTelescope.calls.reset();
    });


    it('should get link to person\'s profile', () => {
      expect(moveToFct.getToTelescope).toHaveBeenCalledWith('Foo Bar');
    });

    it('should render name of the person', () => {
      expect(instance.compiledUrl).toBe('Foo Bar');
    });


    it('should get link to person\'s profile', () => {
      instance.$onChanges({
        name: { currentValue: 'Uncle Bob' }
      });

      expect(moveToFct.getToTelescope.calls.count()).toBe(2);
      expect(moveToFct.getToTelescope).toHaveBeenCalledWith('Uncle Bob');
    });
  });
});*/
