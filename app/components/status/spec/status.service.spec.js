/* eslint max-statements: 0, angular/file-name: 0, max-nested-callbacks: 0 */
import angular  from 'angular';
import module   from '../status.module';


describe('Factory: statusFct', () => {
  let statusFct;
  let roomStatusNameMapConst;
  let requestStatusNameMapConst;

  beforeEach(angular.mock.module(module, $provide => {
    $provide.constant('roomStatusNameMapConst', {
      OCCUPIED : 'foo',
      FREE     : 'free',
      RESERVED : 'reserved',
      TECHNICAL: 'technical',
      DISABLED : 'disabled'
    });
    $provide.constant('requestStatusNameMapConst', {
      IN_PROGRESS: 'In progress'
    });
  }));

  /*@ngInject*/
  beforeEach(inject((_statusFct_, _roomStatusNameMapConst_, _requestStatusNameMapConst_) => {
    statusFct                 = _statusFct_;
    roomStatusNameMapConst    = _roomStatusNameMapConst_;
    requestStatusNameMapConst = _requestStatusNameMapConst_;
  }));

  describe('Room CSS class generator', () => {
    it('should return correct css class for status code', () => {
      const result = statusFct.getRoomCssClass('OCCUPIED');

      expect(result).toBe('oui-room-status--occupied');
    });
  });

  describe('In progress indicator CSS class generator', () => {
    it('should return correct css class for in-progress types', () => {
      const result = statusFct.getIndicatorCssClass('PENDING');

      expect(result).toBe('oui-status-indicator--blocked-middle');
    });
  });

  describe('Status name look up', () => {
    it('should return correct status name for room status', () => {
      const result = statusFct.getStatusName({
        statusMap : roomStatusNameMapConst,
        statusCode: 'RESERVED'
      });

      expect(result).toBe('reserved');
    });

    it('should return correct status name for request status', () => {
      const result = statusFct.getStatusName({
        statusMap : requestStatusNameMapConst,
        statusCode: 'IN_PROGRESS'
      });

      expect(result).toBe('In progress');
    });

    it('should return correct room status name', () => {
      const result = statusFct.getStatusName({
        statusMap : roomStatusNameMapConst,
        statusCode: 'TECHNICAL'
      });

      expect(result).toBe('technical');
    });

    it('should return correct request status name', () => {
      const result = statusFct.getStatusName({
        statusMap : requestStatusNameMapConst,
        statusCode: 'IN_PROGRESS'
      });

      expect(result).toBe('In progress');
    });

    it('should return correct status name when status name is different from status code', () => {
      const result = statusFct.getStatusName({
        statusMap : roomStatusNameMapConst,
        statusCode: 'OCCUPIED'
      });

      expect(result).toBe('foo');
    });

    describe('Status description look up', () => {
      it('should be function', () => {
        expect(statusFct.getStatusDescription).toEqual(jasmine.any(Function));
      });

      it('should give the status description for given status name', () => {
        expect(statusFct.getStatusDescription('IN_PROGRESS')).toMatch(/request.+progress/);
      });
    });
  });
});
