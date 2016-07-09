export default
class TabGraphCtrl {
  /**
   * @ngdoc controller
   * @name osmTabGraph.TabGraphCtrl
   * @class
   *
   * @description Controller for requests graph tab
   */
  /*@ngInject*/
  constructor($injector) {
    const $state = $injector.get('$state');

    this.ModelRequests = $injector.get('RequestsFct');
    this.$routerOnActivate($state);
  }

  $routerOnActivate(next) {
    this.loadRequests(next.params.id);
  }

  loadRequests(id) {
    this.info = this.ModelRequests.queryGraphMock(id);
  }
}
