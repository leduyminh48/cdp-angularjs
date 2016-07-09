import userInfoTpl from './user-info.tpl.html';

// import angular from 'angular';
import RouterReusableCtrl from 'components/router/router-reusable.controller';

export default class extends RouterReusableCtrl {
  /*@ngInject*/
  /**
   * @ngdoc controller
   * @name osmViewRequestsList.ViewRequestsListCtrl
   * @class
   *
   * @description Controller for view list of requests
   */
  constructor($injector, $scope) {
    super($injector, $scope);

    this.viewRequestListFct   = $injector.get('viewRequestListFct');
    this.currentUser          = $injector.get('currentUserFct');
    this.tableSettings        = $injector.get('requestsTableSettingsFct');
    this.ModelRequests        = $injector.get('RequestsFct');
    this.statusFct            = $injector.get('statusFct');
    this.tableSettings        = $injector.get('requestsTableSettingsFct');
    this.paginationDirections = $injector.get('paginationDirectionsConst');
    this.requestPopup         = $injector.get('osmRequestPopupFct');
    this.$log                 = $injector.get('$log');

    this.userInfoTpl = userInfoTpl;

    this.$scope = $scope;

    this.defaultParameters = {
      sortBy    : 'dateCreated',
      sortOrder : 'asc',
      pageNumber: 1,
      pageSize  : 10,
      state     : 'active'
    };

    this.$routerOnActivate();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#$routerOnReuse
   *
   * @description Life cycle hook of the router
   */
  $routerOnReuse() {
    this.loadData();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#$routerOnActivate
   *
   * @description Life cycle hook of the router
   */
  $routerOnActivate() {
    this.initTable();
    this.getUserInfo();

    if (!this.$state.params.state) {
      this.$state.go('.', { state: this.defaultParameters.state });

      return;
    }

    this.loadData();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#initTable
   *
   * @description Init requests table
   */
  initTable() {
    const { sortBy: name, sortOrder: order } = this.getParameters();

    this.table = this.tableSettings.getDefaultSettings({
      onRegisterApi: (...args) => this.onRegisterApi(...args),
      defaultSort  : { name, order }
    });
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#getStatusTooltipText
   * @params {string} status - status to get description for
   *
   * @description Gets the description for the passed in status
   */
  getStatusTooltipText(status) {
    return this.statusFct.getStatusDescription(status);
  }


  /**
   * @ngdoc method
   * @methodOf osmEmployees.EmployeesFct
   * @name osmViewRequestsList.ViewRequestsListCtrl#getUserInfo
   *
   *
   * @description Loads current user info
   */
  getUserInfo() {
    this.userInfo = {
      unit    : this.currentUser.getUnitName(),
      unitPath: this.currentUser.getUnitPath()/*,
      area    : this.currentUser.getArea(), //todo: we need some way to get place and area info from unitPath @to Ihor
      place   : this.currentUser.getPlace()*/
    };
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#getStatusLink
   * @params {Object} inProgressType - the type of the status current progress
   * @params {string} id - status id
   *
   * @description Determines the link for request status
   */
  getStatusLink({ inProgressType, id }) {
    if (inProgressType) {
      this.$state.go('^.^.details.graph', { id });
    }
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#movePagination
   * @params {string} direction - direction to change the current pagination value based on
   *
   * @description Decrease/increase current pagination page based on passed in direction
   */
  movePagination(direction) {
    let pageNumber;

    if (direction === this.paginationDirections.left) {
      pageNumber = this.pageNumber - 1;
    } else {
      pageNumber = this.pageNumber + 1;
    }

    this.$state.go('.', { pageNumber });
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#onRegisterApi
   *
   * @description On register table api
   */
  onRegisterApi(gridApi) {
    this.gridApi = gridApi;

    gridApi.core.on.sortChanged(this.$scope, (...args) =>
      this.changeSort(...args));

    gridApi.selection.on.rowSelectionChanged(this.$scope, row =>
      this.onRowSelection(row));
    gridApi.selection.on.rowSelectionChangedBatch(this.$scope, rows =>
      this.onRowsSelection(rows));

    gridApi.grid.methods = {
      editRequest         : this.editRequest.bind(this),
      approveRequest      : this.approveRequest.bind(this),
      closeRequest        : this.closeRequest.bind(this),
      deleteRequest       : this.deleteRequest.bind(this),
      getStatusTooltipText: this.getStatusTooltipText.bind(this),
      getStatusLink       : this.getStatusLink.bind(this)
    };
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#loadData
   *
   *
   * @description Loads the table according to next parameters
   */
  loadData() {
    const parameters = this.getParameters();

    this.pageSize   = +parameters.pageSize;
    this.pageNumber = +parameters.pageNumber;
    this.table.data = this.ModelRequests.getPage(parameters);

    this.table.data
      .$promise
      .then(data => {
        this.totalPagesAmount = Math.ceil(data.totalListItemsAmount / this.pageSize);
      });

    if (this.gridApi) {
      this.gridApi.selection.clearSelectedRows();
    }
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#changeSort
   *
   * @description Changes sorting - event handler from ui-table
   */
  changeSort(grid, [column = {}] = []) {
    const { name  : sortBy, sort: { direction: sortOrder } = {} } = column;

    if (!sortBy) {
      this.setDefaultSort(grid);

      return;
    }

    this.$state.go('.', { sortBy, sortOrder });
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#setDefaultSort
   *
   * @params {Object} grid Ui grid instance
   *
   * @description Sets default sorting for a table
   */
  setDefaultSort(grid) {
    const { sortBy, sortOrder } = this.defaultParameters;
    const column = grid.getColumn(sortBy);

    grid.sortColumn(column, sortOrder);
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#onRowSelection
   *
   * @description Handler for single row selection changes
   */
  onRowSelection() {
    this.toggleMultiControls();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#onRowsSelection
   *
   * @description Handler for multi rows selection changes
   */
  onRowsSelection() {
    this.toggleMultiControls();
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#toggleMultiControls
   *
   * @description Handler for rows selection changes
   */
  toggleMultiControls() {
    const selectedRows = this.getSelectedRows();

    this.isMultipleSelected                   = selectedRows.length > 1;
    this.gridApi.selection.isMultipleSelected = this.isMultipleSelected; // pass to the table
    this.isRequestToApproveSelected           = this.ModelRequests.filterToApprove(selectedRows).length;
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#getSelectedRows
   *
   * @returns {Array.<Object>} Array of selected rows
   *
   * @description Gets all selected rows
   */
  getSelectedRows() {
    return this.gridApi.selection.getSelectedRows();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#createMovementRequest
   *
   * @description Opens create movement request dialog
   */
  createMovementRequest() {
    this.requestPopup.createMovementRequest();
  }


  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#createSwapRequest
   *
   * @description Opens create swap request dialog
   */
  createSwapRequest() {
    this.requestPopup.createSwapRequest();
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#editRequest
   *
   * @description Opens edit request dialog
   */
  editRequest(request) {
    this.requestPopup.open(request);
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#approveRequest
   *
   * @description Opens confirmation dialog for approving request
   * @todo: I'd prefer to use promises in this and next methods instead of passing a callback
   */
  approveRequest(request) {
    this.viewRequestListFct.confirmAction({
      requestId: request.id,
      action   : 'approve',
      title    : 'Approval Confirmation',
      callback : this.loadData.bind(this)
    });
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#closeRequest
   *
   * @description Opens confirmation dialog for closing request
   */
  closeRequest(request) {
    this.viewRequestListFct.confirmAction({
      requestId: request.id,
      action   : 'close',
      title    : 'Close Confirmation',
      callback : this.loadData.bind(this)
    });
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#deleteSwapRequest
   *
   * @description confirmation dialog for deleting request
   */
  deleteRequest(request) {
    this.viewRequestListFct.confirmAction({
      requestId: request.id,
      action   : 'delete',
      title    : 'Deletion Confirmation',
      callback : this.loadData.bind(this)
    });
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#approveRequestMultiple
   *
   * @description confirmation dialog for multiple approval request
   */
  approveRequestMultiple() {
    this.viewRequestListFct.confirmActionMultiple({
      requests: this.getSelectedRows(),
      action  : 'approve',
      title   : 'Multiple Approval Confirmation',
      callback: this.loadData.bind(this)
    });
  }

  /**
   * @ngdoc method
   * @methodOf osmViewRequestsList.ViewRequestsListCtrl
   * @name osmViewRequestsList.ViewRequestsListCtrl#closeRequestMultiple
   *
   * @description confirmation dialog for multiple closing request
   */
  closeRequestMultiple() {
    this.viewRequestListFct.confirmActionMultiple({
      requests: this.getSelectedRows(),
      action  : 'close',
      title   : 'Multiple Closing Confirmation',
      callback: this.loadData.bind(this)
    });
  }
}
