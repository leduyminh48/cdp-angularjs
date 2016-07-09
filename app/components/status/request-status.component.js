import templateUrl from './request-status.tpl.html';

class controller {
  /**
   * @ngdoc controller
   * @name osmStatus.RequestStatusCtrl
   *
   * @class
   * @description
   * Controller for status component
   */
  /*@ngInject*/
  constructor($injector) {
    this.statusFct = $injector.get('statusFct');
    this.statusMap = $injector.get('requestStatusNameMapConst');
  }

  $onChanges({ statusCode, statusIndicator }) {
    if (statusCode) {
      this.statusName = this.statusFct.getStatusName({
        statusMap: this.statusMap,
        statusCode: statusCode.currentValue
      });
    }
    this.showIndicator = statusIndicator && statusIndicator.currentValue;
    this.indicatorCssClass = this.showIndicator ?
      this.statusFct.getIndicatorCssClass(statusIndicator.currentValue) : '';
  }
}


/**
 * @ngdoc directive
 * @name osmStatus.osmRequestStatus
 *
 * @scope
 *
 * @description
 * Component to render status for request
 */
export default {
  templateUrl,
  controller,
  bindings : {
    statusCode: '<status',
    statusIndicator: '<'
  }
};
