export default class TabMainCtrl {
  /**
   * @ngdoc controller
   * @name osmOfficePlaceTabMain.osmOfficePlaceTabMain
   * @class
   *
   * @description Controller for office main information tab
   */
  /*@ngInject*/
  constructor($injector) {
    const $state = $injector.get('$state');

    this.ModelPlaces = $injector.get('modelPlaceFct');
    this.$routerOnActivate($state);
  }

  $routerOnActivate(next) {
    this.loadRequests(next.params.id);
  }

  loadRequests(id) {
    this.info = this.ModelPlaces.getById(id);
  }
}
