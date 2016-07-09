/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../status.module';


describe('Component: osm-room-status', () => {
  let $componentController;
  let scope;
  let roomStatusNameMapConst;

  const statusFct = {
    getRoomCssClass: jasmine.createSpy('getRoomCssClass').and
      .callFake(statusCode => `oui-room-status--${ statusCode.toLowerCase() }`),
    getStatusName  : jasmine.createSpy('getStatusName').and
      .callFake(({ statusMap, statusCode }) =>
        statusMap[statusCode])
  };

  beforeEach(angular.mock.module(module, $provide => {
    $provide.constant('statusFct', statusFct);
  }));


  beforeEach(inject((_$componentController_, _$rootScope_, _roomStatusNameMapConst_) => {
    $componentController   = _$componentController_;
    scope                  = _$rootScope_.$new();
    roomStatusNameMapConst = _roomStatusNameMapConst_;
  }));

  it('should define component', () => {
    const roomStatus = $componentController('osmRoomStatus', scope);

    expect(roomStatus).toBeDefined();
  });

  describe('Providing room status', () => {
    let instance;
    let bindings;

    beforeEach(() => {
      bindings = {
        statusMap: roomStatusNameMapConst
      };
      instance = $componentController('osmRoomStatus', scope, bindings);

      instance.$onChanges({
        statusCode: {
          currentValue: 'OCCUPIED'
        }
      });
    });

    afterEach(() => {
      statusFct.getRoomCssClass.calls.reset();
      statusFct.getStatusName.calls.reset();
    });


    it('should call method to get generate css class', () => {
      expect(statusFct.getRoomCssClass).toHaveBeenCalledWith('OCCUPIED');
    });

    it('should generate correct css class', () => {
      expect(instance.roomCssClass).toBe('oui-room-status--occupied');
    });


    it('should generate correct status name', () => {
      instance.$onChanges({
        statusCode: {
          currentValue: 'RESERVED'
        }
      });

      const firstCallArgs      = statusFct.getStatusName.calls.first().args[0];
      const mostRecentCallArgs = statusFct.getStatusName.calls.mostRecent().args[0];

      expect(statusFct.getStatusName.calls.count()).toBe(2);
      expect(firstCallArgs).toEqual({
        statusCode: 'OCCUPIED',
        statusMap : roomStatusNameMapConst
      });
      expect(mostRecentCallArgs).toEqual({
        statusCode: 'RESERVED',
        statusMap : roomStatusNameMapConst
      });
    });
  });
});
