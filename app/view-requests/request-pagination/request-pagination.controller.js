export default class requestPaginationCtrl {
  /**
   * @ngdoc controller
   * @name osmRequestPagination.requestPaginationCtrl
   * @class
   *
   * @description Controller for requests pagination
   */
  /*@ngInject*/
  constructor($injector) {
    const pgnDirections = $injector.get('paginationDirectionsConst');

    this.pgnDirectionLeft  = pgnDirections.left;
    this.pgnDirectionRight = pgnDirections.right;
  }

}
