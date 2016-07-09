import idCellTemplate       from './id.tpl.html';
import employeeCellTemplate from './employee.tpl.html';
import fromCellTemplate     from './from.tpl.html';
import toCellTemplate       from './to.tpl.html';
import statusCellTemplate   from './status.tpl.html';
import controlsCellTemplate from './controls.tpl.html';

export default /*@ngInject*/function requestsTableSettingsFct(uiGridConstants) {
  /**
   * @ngdocs service
   * @name osmViewRequests.requestsTableSettingsFct
   */
  return {
    /**
     * @ngdoc method
     * @name osmViewRequests.requestsTableSettingsFct#getDefaultSettings
     * @methodOf requestsTableSettingsFct.requestsTableSettingsFct
     *
     * @params {Object} [parameters = {}] Parameters for the table
     * @params {Function} [parameters.onRegisterApi] onRegisterApi handler
     *
     * @returns {object} Default requests table settings
     *
     * @description Creates default requests table settings
     */
    getDefaultSettings({ onRegisterApi, defaultSort } = {}) {
      return {
        enableRowSelection: true,
        enableSelectAll   : true,
        useExternalSorting: true,
        defaultSort,
        onRegisterApi,

        columnDefs: [
          {
            displayName : 'ID',
            name        : 'id',
            minWidth    : 100,
            cellTemplate: idCellTemplate
          },
          {
            displayName : 'Employee',
            name        : 'employee',
            minWidth    : 150,
            cellTemplate: employeeCellTemplate
          },
          {
            displayName : 'From',
            name        : 'placeFrom',
            minWidth    : 150,
            cellTemplate: fromCellTemplate
          },
          {
            displayName : 'To',
            name        : 'placeTo',
            minWidth    : 150,
            cellTemplate: toCellTemplate
          },
          {
            name    : 'Status',
            minWidth: 120,

            headerCellClass: 'oui-status-cell',
            cellTemplate   : statusCellTemplate
          },
          {
            displayName       : 'Date',
            name              : 'dateCreated',
            minWidth          : 120,
            cellFilter        : 'date : "mediumDate"',
            sortDirectionCycle: [uiGridConstants.ASC, uiGridConstants.DESC]
          },
          {
            displayName : '',
            name        : 'Controls',
            minWidth    : 120,
            cellTemplate: controlsCellTemplate
          }
        ]
      };
    }
  };
}
