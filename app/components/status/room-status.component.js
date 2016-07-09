import templateUrl from './room-status.tpl.html';

class controller {
  /**
   * @ngdoc controller
   * @name osmStatus.RoomStatusCtrl
   *
   * @class
   * @description
   * Controller for status component
   */
  /*@ngInject*/
  constructor($injector) {
    this.statusFct = $injector.get('statusFct');
    this.statusMap = $injector.get('roomStatusNameMapConst');
  }

  $onChanges({ statusCode }) {
    if (statusCode) {
      this.statusName = this.statusFct.getStatusName({
        statusMap: this.statusMap,
        statusCode: statusCode.currentValue
      });

      this.roomCssClass = this.statusFct.getRoomCssClass(statusCode.currentValue);
    }
  }
}


/**
 * @ngdoc directive
 * @name osmStatus.osmRoomStatus
 *
 * @scope
 *
 * @description
 * Component to render status for room
 */
export default {
  templateUrl,
  controller,
  bindings  : {
    statusCode: '<status'
  }
};
