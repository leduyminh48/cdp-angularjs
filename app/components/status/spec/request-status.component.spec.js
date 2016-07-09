/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../status.module';


describe('Component: osm-request-status', () => {
  let $componentController;
  let scope;
  let requestStatusNameMapConst;

  const statusFct = {
    getStatusName: jasmine.createSpy('getStatusName').and
      .callFake(({ statusMap, statusCode }) =>
        statusMap[statusCode]),
    getIndicatorCssClass: jasmine.createSpy('getInProgressCssClass').and
      .callFake(statusCode =>
        `oui-status-indicator--${ statusCode.toLowerCase() }`)
  };

  beforeEach(angular.mock.module(module, $provide => {
    $provide.constant('statusFct', statusFct);
  }));

  beforeEach(inject((_$componentController_, _$rootScope_, _requestStatusNameMapConst_) => {
    $componentController = _$componentController_;
    scope = _$rootScope_.$new();
    requestStatusNameMapConst = _requestStatusNameMapConst_;
  }));

  it('should define component', () => {
    const requestStatus = $componentController('osmRequestStatus', scope);

    expect(requestStatus).toBeDefined();
  });

  describe('Providing request status for in progress type', () => {
    let instance;
    let bindings;

    beforeEach(() => {
      bindings = {
        statusMap: requestStatusNameMapConst
      };
      instance = $componentController('osmRequestStatus', scope, bindings);

      instance.$onChanges({
        statusCode: {
          currentValue: 'IN_PROGRESS'
        },
        statusIndicator: {
          currentValue: 'blocked-middle'
        }
      });
    });

    afterEach(() => {
      statusFct.getIndicatorCssClass.calls.reset();
      statusFct.getStatusName.calls.reset();
    });

    it('should show in-progress indicator', () => {
      expect(instance.showIndicator).toBeTruthy();
    });

    it('should call method to get generate css class', () => {
      expect(statusFct.getIndicatorCssClass).toHaveBeenCalledWith('blocked-middle');
    });

    it('should generate correct css class', () => {
      expect(instance.indicatorCssClass).toBe('oui-status-indicator--blocked-middle');
    });

    it('should generate correct status name', () => {
      expect(statusFct.getStatusName).toHaveBeenCalled();
      expect(statusFct.getStatusName.calls.mostRecent().args[0]).toEqual({
        statusCode: 'IN_PROGRESS',
        statusMap: requestStatusNameMapConst
      });
    });
  });
});
