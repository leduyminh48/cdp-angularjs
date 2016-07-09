export default class TabHistoryCtrl {
  /**
   * @ngdoc controller
   * @name osmTabHistory.TabHistoryCtrl
   * @class
   *
   * @description Controller for requests history tab
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
    this.info = this.ModelRequests.queryHistoryMock(id);
  }
}

