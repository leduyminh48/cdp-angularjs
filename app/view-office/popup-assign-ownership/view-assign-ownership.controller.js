export default class ViewAssignOwnershipCtrl {
  /**
   * @ngdoc controller
   * @name osmViewAssignOwnership.ViewAssignOwnershipCtrl
   * @class
   *
   * @description Controller for assign ownership view
   */
  /*@ngInject*/
  constructor($injector) {
    this.$q       = $injector.get('$q');
    this.$timeout = $injector.get('$timeout');
  }

  onSubmit() {
    return this.$q(resolve => this.$timeout(resolve, 2000));
  }
}
