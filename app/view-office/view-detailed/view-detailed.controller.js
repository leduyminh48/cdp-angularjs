/**
 * @ngdoc controller
 * @name osmViewOfficeDetailed.ViewOfficeDetailedCtrl
 * @class
 *
 * @description Controller for view office
 * @todo: add tests and documentation
 */
export default class {
  /*@ngInject*/
  constructor($injector) {
    this.$state                = $injector.get('$state');
    this.ModelAreas            = $injector.get('modelAreaFct');
    this.areasTableSettingsFct = $injector.get('areasTableSettingsFct');

    this.$routerOnActivate();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeDetailed.ViewOfficeDetailedCtrl
   * @name osmViewOfficeDetailed.ViewOfficeDetailedCtrl#$routerOnActivate
   *
   * @description - calls on initialization phase
   */
  $routerOnActivate() {
    const { id } = this.$state.params;

    this.initAreaTable(id);
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeDetailed.ViewOfficeDetailedCtrl
   * @name osmViewOfficeDetailed.ViewOfficeDetailedCtrl#initAreaTable
   *
   * @description - init the office area table (fetch and format the data received in needed format)
   */
  initAreaTable() {
    this.tableSettings = this.areasTableSettingsFct.getDefaultSettings();
    this.loadData();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeDetailed.ViewOfficeDetailedCtrl
   * @name osmViewOfficeDetailed.ViewOfficeDetailedCtrl#loadData
   * @params {Object} angular state service object
   *
   * @description loads data for office area list
   */
  loadData() {
    const { id, selectedArea = 0 } = this.$state.params;

    this.ModelAreas.getById(id).$promise.then(data => {
      this.tableSettings.areas = data.areas;
      this.tableSettings.data  = data.areas[selectedArea].places;
    });
  }
}
