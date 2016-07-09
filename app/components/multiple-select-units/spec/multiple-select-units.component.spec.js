/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../';


describe('Component: osm-multiple-select-units', () => {
  let $componentController;
  let $rootScope;
  let $q;

  const componentName = 'osmMultipleSelectUnits';

  let unitsSelector;
  const UnitSelectFct = {
    create: jasmine.createSpy('create').and.callFake(() => unitsSelector)
  };

  beforeEach(angular.mock.module(module, $provide => {
    $provide.constant('UnitSelectFct', UnitSelectFct);
  }));

  beforeEach(inject($injector => {
    $componentController = $injector.get('$componentController');
    $rootScope           = $injector.get('$rootScope');
    $q                   = $injector.get('$q');
  }));


  afterEach(() => {
    UnitSelectFct.create.calls.reset();
    unitsSelector = null;
  });


  it('should define component', () => {
    const instance = $componentController(componentName, { $attrs: {} });

    expect(instance).toBeDefined();
  });

  describe('Init', () => {
    const defaultUnit = {};

    beforeEach(() => {
      unitsSelector = {
        init       : jasmine.createSpy('init').and.callFake(units => {
          units.push(defaultUnit);
        }),
        getChildren: jasmine.createSpy('getChildren')
      };
    });


    afterEach(() => {
      unitsSelector.getChildren.calls.reset();
    });


    it('should create UnitSelectFct instance with parameters', () => {
      const bindings = {
        initType  : '-',
        startType : 'foo',
        finishType: 'bar',
        units     : []
      };
      const instance = $componentController(componentName, { $attrs: {} }, bindings);

      instance.$onInit();

      expect(UnitSelectFct.create).toHaveBeenCalledWith(
        jasmine.objectContaining(bindings)
      );
    });


    it('should call init method on units selector instance if units array was empty', () => {
      const instance = $componentController(componentName, { $attrs: {} }, { units: [] });

      instance.$onInit();
      expect(unitsSelector.init).toHaveBeenCalled();
    });


    it('should assign the result of init method to units (async)', () => {
      const instance = $componentController(componentName, { $attrs: {} }, { units: [] });

      instance.$onInit();
      expect(instance.units[0]).toEqual(defaultUnit);
    });


    it('should set required property', () => {
      const locals   = {
        $attrs: {
          required: 'required'
        }
      };
      const instance = $componentController(componentName, locals, { units: [] });

      expect(instance.required).toBeTruthy();
    });
  });


  describe('Selection', () => {
    let instance;
    let children;
    let promise;

    const defaultBindings = {
      units   : null,
      onChange: jasmine.createSpy('onChange'),
      onFinish: jasmine.createSpy('onFinish')
    };


    beforeEach(() => {
      unitsSelector = {
        init       : jasmine.createSpy('init'),
        getChildren: jasmine.createSpy('getChildren')
          .and.callFake(() => {
            promise = $q.resolve(children);

            return promise;
          })
      };

      defaultBindings.units = [{ id: 'foo-id', name: 'foo-name' }];
      instance              = $componentController(componentName, { $attrs: {} }, defaultBindings);
      instance.$onInit();
    });


    afterEach(() => {
      unitsSelector.getChildren.calls.reset();
      children = null;
      promise  = null;

      defaultBindings.onChange.calls.reset();
      defaultBindings.onFinish.calls.reset();
    });


    it('should not call units if index is greater then length of the units list (select in the middle)', () => {
      instance.onSelect(1, {});
      expect(unitsSelector.getChildren).not.toHaveBeenCalled();
    });


    it('should call getChild method of the units selector on unit selection', () => {
      const unit = { id: 'foo-bar' };

      instance.onSelect(0, unit);
      expect(unitsSelector.getChildren).toHaveBeenCalledWith(unit);
    });


    describe('New children receiving', () => {
      beforeEach(() => {
        children = [{ id: 'child-bar' }];
        instance.onSelect(0, {});
      });


      it('should insert new children list in the proper position', done => {
        promise.then(() => {
          expect(instance.units[1]).toEqual({ list: children });
          done();
        });

        $rootScope.$apply();
      });


      it('should call on change', done => {
        promise.then(() => {
          expect(defaultBindings.onChange).toHaveBeenCalled();
          done();
        });

        $rootScope.$apply();
      });

      it('should not call onChange if new units have come', () => {
        instance.$onChanges({ units: { currentValue: [] } });
        expect(defaultBindings.onChange).not.toHaveBeenCalled();
      });
    });


    describe('No new children receiving', () => {
      beforeEach(() => {
        instance.onSelect(0, {});
      });


      it('should insert new children list in the proper position', done => {
        promise.then(() => {
          expect(instance.units[1]).toBeUndefined();
          done();
        });

        $rootScope.$apply();
      });


      it('should not call on change', done => {
        promise.then(() => {
          expect(defaultBindings.onChange).not.toHaveBeenCalled();
          done();
        });

        $rootScope.$apply();
      });


      it('should not call on finish', done => {
        promise.then(() => {
          expect(defaultBindings.onFinish).toHaveBeenCalled();
          done();
        });

        $rootScope.$apply();
      });
    });
  });
});
