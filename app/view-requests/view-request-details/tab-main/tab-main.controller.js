export default class TabMainCtrl {
  /**
   * @ngdoc controller
   * @name osmTabMain.TabMainCtrl
   * @class
   *
   * @description Controller for requests main information tab
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
    this.info = this.ModelRequests.get({ id });
  }
}

