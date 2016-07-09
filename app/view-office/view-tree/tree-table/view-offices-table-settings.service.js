import locationCellTemplate  from './location.tpl.html';
import statisticCellTemplate from './statistics.tpl.html';
import ownershipCellTemplate from './ownership.tpl.html';

export default /*@ngInject*/function officeTableSettingsFct() {
  /**
   * @ngdocs service
   * @name osmViewOffice.officeTableSettingsFct
   */
  return {
    /**
     * @ngdoc method
     * @name osmViewOffice.officeTableSettingsFct#getDefaultSettings
     * @methodOf officeTableSettingsFct.officeTableSettingsFct
     *
     * @returns {Object} Default office list table settings
     *
     * @description Creates default office list table settings
     */
    getDefaultSettings({ onRegisterApi, cellClass }) {
      return {
        enableRowSelection      : true,
        enableExpandAll         : false,
        showTreeExpandNoChildren: false,
        showTreeRowHeader       : false,
        onRegisterApi,
        columnDefs: [
          {
            displayName : 'location',
            name        : 'name',
            cellTemplate: locationCellTemplate,
            cellClass
          },
          {
            displayName: 'owner',
            name       : 'owner',
            cellClass
          },
          {
            displayName: 'total',
            name       : 'totalWp',
            cellClass
          },
          {
            displayName: 'free',
            name       : 'freeWp',
            cellClass
          },
          {
            displayName : 'distribution',
            name        : 'statistics',
            cellTemplate: statisticCellTemplate,
            cellClass
          },
          {
            displayName : '',
            name        : 'ownership',
            cellTemplate: ownershipCellTemplate,
            cellClass
          }
        ]
      };
    }
  };
}
