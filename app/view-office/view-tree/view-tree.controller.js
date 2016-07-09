/**
 * in order do not include needless tree in the table
 * @type {number}
 */
const MAX_TRRE_DEEP = 2;

/**
 * @ngdoc controller
 * @name osmViewOfficeTree.ViewOfficeTreeCtrl
 * @class
 *
 * @description Controller for view office tree
 * @todo: add tests
 */
export default class {
  /*@ngInject*/
  constructor($injector) {
    this.$state                  = $injector.get('$state');
    this.ModelOffices            = $injector.get('modelOfficesFct');
    this.officesTableSettingsFct = $injector.get('officesTableSettingsFct');
    this.assignOwnershipPopup    = $injector.get('osmAssignOwnershipPopupFct');

    this.$routerOnActivate();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeTree.ViewOfficeTreeCtrl
   * @name osmViewOfficeTree.ViewOfficeTreeCtrl#makeTreeData
   *
   * @param {Array} childArray
   * @param {number} currentLevel
   * @param {Array} dataArray
   * @param {number} treeDeep
   *
   * @description prepares data for the tree table
   */
  makeTreeData(childArray, currentLevel, dataArray, treeDeep = 0) {
    if (treeDeep === MAX_TRRE_DEEP) {
      return;
    }

    childArray.forEach(childNode => {
      const { childField } = childNode;

      if (childNode[childField] && childNode[childField].length) {
        childNode.$$treeLevel = currentLevel; //eslint-disable-line angular/no-private-call
      }
      dataArray.push(childNode);
      if (childNode[childField]) {
        treeDeep++;
        this.makeTreeData(childNode[childField], currentLevel + 1, dataArray, treeDeep);
        treeDeep--;
      }
    });
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeTree.ViewOfficeTreeCtrl
   * @name osmViewOfficeTree.ViewOfficeTreeCtrl#$routerOnActivate
   *
   * @description calls on initialization phase
   */
  $routerOnActivate() {
    this.initOfficesTable();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeTree.ViewOfficeTreeCtrl
   * @name osmViewOfficeTree.ViewOfficeTreeCtrl#initOfficesTable
   *
   * @description - init the office table (fetch and format the data received in needed format)
   */
  initOfficesTable() {
    this.tableSettings = this.officesTableSettingsFct.getDefaultSettings({
      onRegisterApi: (...args) => this.onRegisterApi(...args),
      cellClass    : (...args) => this.cellClass(...args)
    });

    this.loadData(this.$state.params);
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeTree.ViewOfficeTreeCtrl
   * @name osmViewOfficeTree.ViewOfficeTreeCtrl#onRegisterApi
   *
   * @description on register table api
   */
  onRegisterApi(gridApi) {
    gridApi.grid.registerDataChangeCallback(() => {
      gridApi.treeBase.expandAllRows();
    });
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeTree.ViewOfficeTreeCtrl
   * @name osmViewOfficeTree.ViewOfficeTreeCtrl#cellClass
   * @param args {Array} Destructed cell data (...args)
   *
   * @description Defines the class to be added to the cell
   */
  cellClass(...args) {
    const [, row,,, colRenderIndex] = args;
    let cellClassString = '';

    if (row.treeLevel === 0) {
      cellClassString += 'oui-tree-parent-column';
    }

    if (row.treeLevel !== 0 && colRenderIndex === 0) {
      cellClassString += 'oui-padded-first-column';
    }

    return cellClassString;
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeTree.ViewOfficeTreeCtrl
   * @name osmViewOfficeTree.ViewOfficeTreeCtrl#loadData
   * @params {Object} angular state service object
   *
   * @description loads data for office list
   */
  loadData({ id }) {
    this.ModelOffices.query().$promise.then(data => {
      const dataFormatted = [];

      if (id && id !== 'city') { //todo: 'city' is a hardcode here - please find a way to fix this
        data = [data.find(item => item.id === id)];
      }

      this.makeTreeData(data, 0, dataFormatted);
      this.tableSettings.data = dataFormatted;
    });
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeTree.ViewOfficeTreeCtrl
   * @name osmViewOfficeTree.ViewOfficeTreeCtrl#assignOwnership
   *
   * @description opens 'Assign Ownership' popup
   */
  assignOwnership() {
    this.assignOwnershipPopup.open();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewOfficeTree.ViewOfficeTreeCtrl
   * @name osmViewOfficeTree.ViewOfficeTreeCtrl#goTo
   * @params {Object} row data object
   *
   * @description redirects to the proper route based on the row type
   */
  goTo({ type, id }) {
    if (type === 'office') {
      this.$state.go('.', { id });
    }

    if (type === 'floor') {
      this.$state.go('^.detailed', { id });
    }
  }
}
