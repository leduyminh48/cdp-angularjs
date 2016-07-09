/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../';


describe('Factory: UnitSelectFct', () => {
  let $rootScope;
  let $q;
  let UnitSelect;

  const Units  = {};
  const Places = {};

  beforeEach(angular.mock.module(module, $provide => {
    $provide.constant('UnitsFct', Units);
    $provide.constant('PlacesFct', Places);
  }));

  beforeEach(inject($injector => {
    UnitSelect = $injector.get('UnitSelectFct');
    $rootScope = $injector.get('$rootScope');
    $q         = $injector.get('$q');
  }));

  it('should define component', () => {
    expect(UnitSelect).toBeDefined();
  });

  describe('Init', () => {
    let currentPosition;

    beforeAll(() => {
      Units.getCurrent = jasmine.createSpy('getCurrent').and
        .callFake(() => ({
          $promise: $q.resolve(currentPosition)
        }));
    });

    afterEach(() => {
      Units.getCurrent.calls.reset();
    });

    afterAll(() => {
      Units.getCurrent = null;
    });

    describe('initType is undefined', () => {
      const units = [];
      let unitSelector;
      let result;

      beforeEach(() => {
        unitSelector = UnitSelect.create();
        result       = unitSelector.init(units);
      });


      it('should not call current position', () => {
        expect(Units.getCurrent).not.toHaveBeenCalled();
      });


      it('should not init array if initType is not provided', done => {
        result.then(() => {
          expect(units.length).toBe(0);
          done();
        });

        $rootScope.$apply();
      });
    });


    describe('initType is set', () => {
      const units = [];
      let unitSelector;
      let result;

      beforeEach(() => {
        unitSelector = UnitSelect.create({
          initType : 'foo',
          startType: 'bar'
        });

        currentPosition = [{ type: 'Lorem' }, { type: 'bar' }, { type: 'ipsum' }, { type: 'foo' }, { type: 'dolor' }];
        result          = unitSelector.init(units);
      });


      it('should call current position', () => {
        expect(Units.getCurrent).toHaveBeenCalled();
      });


      it('should init units array from startType ot initType', done => {
        result.then(() => {
          expect(units.length).toBe(3);
          expect(units[0].selected).toBe(currentPosition[1]);
          expect(units[0].list).toEqual(jasmine.any(Array));
          expect(units[1].selected).toBe(currentPosition[2]);
          expect(units[1].list).toEqual(jasmine.any(Array));
          expect(units[2].selected).toBe(currentPosition[3]);
          expect(units[2].list).toEqual(jasmine.any(Array));
          done();
        });

        $rootScope.$apply();
      });
    });
  });


  describe('Get children', () => {
    let returnedChildren;
    let returnedPlaces;

    beforeAll(() => {
      Units.getChildren = jasmine.createSpy('getChildren').and
        .callFake(() => ({
          $promise: $q.resolve(returnedChildren)
        }));

      Places.getForUnit = jasmine.createSpy('getForUnit').and
        .callFake(() => ({
          $promise: $q.resolve(returnedPlaces)
        }));
    });


    afterEach(() => {
      Units.getChildren.calls.reset();
      Places.getForUnit.calls.reset();
      returnedChildren = null;
      returnedPlaces   = null;
    });


    afterAll(() => {
      Units.getChildren = null;
      Places.getForUnit = null;
    });


    describe('Finish type reached', () => {
      let unitSelector;
      let result;

      beforeEach(() => {
        unitSelector = UnitSelect.create({
          finishType: 'foo-bar'
        });
        result       = unitSelector.getChildren({
          type: 'foo-bar'
        });
      });


      it('should not call Units.getChildren', () => {
        expect(Units.getChildren).not.toHaveBeenCalled();
      });


      it('should not call Places.getForUnit', () => {
        expect(Places.getForUnit).not.toHaveBeenCalled();
      });


      it('should return null in the result', done => {
        result.then(units => {
          expect(units).toBe(null);
          done();
        });

        $rootScope.$apply();
      });
    });


    describe('Fetching units', () => {
      let unitSelector;
      let result;

      beforeEach(() => {
        returnedChildren = [{ id: 'foo-id', type: 'foo-type' }];

        unitSelector = UnitSelect.create({
          finishType: 'bar-finish-type'
        });
        result       = unitSelector.getChildren({
          type: 'bar-type',
          id  : 'bar-id'
        });
      });


      it('should call Units.getChildren', () => {
        expect(Units.getChildren).toHaveBeenCalledWith(jasmine.objectContaining({
          id: 'bar-id'
        }));
      });


      it('should not call Places.getForUnit', () => {
        expect(Places.getForUnit).not.toHaveBeenCalled();
      });


      it('should return children in the result', done => {
        result.then(units => {
          expect(units).toBe(returnedChildren);
          done();
        });

        $rootScope.$apply();
      });
    });


    describe('Fetching places', () => {
      let unitSelector;
      let result;

      beforeEach(() => {
        returnedChildren = [];
        returnedPlaces   = [{ id: 'foo-id', type: 'foo-type' }];

        unitSelector = UnitSelect.create({
          finishType: 'bar-finish-type'
        });
        result       = unitSelector.getChildren({
          type: 'bar-type',
          id  : 'bar-id'
        });
      });


      it('should call Units.getChildren', () => {
        expect(Units.getChildren).toHaveBeenCalledWith(jasmine.objectContaining({
          id: 'bar-id'
        }));
      });


      it('should call Places.getForUnit', done => {
        result.then(() => {
          expect(Places.getForUnit).toHaveBeenCalledWith(jasmine.objectContaining({
            id: 'bar-id'
          }));

          done();
        });

        $rootScope.$apply();
      });


      it('should return children in the result', done => {
        result.then(units => {
          expect(units).toBe(returnedPlaces);
          done();
        });

        $rootScope.$apply();
      });
    });
  });
});
