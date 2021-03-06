/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../person-link.module';


describe('Component: osm-person-telescope-link', () => {
  let $componentController;
  let scope;
  const linkFct = {
    getToTelescope: jasmine.createSpy('getToTelescope').and.callFake(value => value)
  };

  beforeEach(angular.mock.module(module, $provide => {
    $provide.constant('linkFct', linkFct);
  }));


  beforeEach(inject((_$componentController_, _$rootScope_) => {
    $componentController = _$componentController_;
    scope                = _$rootScope_.$new();
  }));


  it('should define component', () => {
    const instance = $componentController('osmPersonTelescopeLink', scope);

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
      linkFct.getToTelescope.calls.reset();
    });


    it('should get link to person\'s profile', () => {
      expect(linkFct.getToTelescope).toHaveBeenCalledWith('Foo Bar');
    });

    it('should render name of the person', () => {
      expect(instance.compiledUrl).toBe('Foo Bar');
    });


    it('should get link to person\'s profile', () => {
      instance.$onChanges({
        name: { currentValue: 'Uncle Bob' }
      });

      expect(linkFct.getToTelescope.calls.count()).toBe(2);
      expect(linkFct.getToTelescope).toHaveBeenCalledWith('Uncle Bob');
    });
  });
});
