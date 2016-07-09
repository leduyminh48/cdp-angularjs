import placeCellTemplate from './place.tpl.html';

export default /*@ngInject*/function areasTableSettingsFct() {
  /**
   * @ngdocs service
   * @name osmViewAreaList.areasTableSettingsFct
   */
  return {
    /**
     * @ngdoc method
     * @name osmViewAreaList.areasTableSettingsFct#getDefaultSettings
     * @methodOf areasTableSettingsFct.areasTableSettingsFct
     *
     * @returns {object} Default office areas table settings
     *
     * @description Creates default office areas table settings
     */
    getDefaultSettings() {
      return {
        enableRowSelection      : true,
        enableColumnMenus       : false,
        enableExpandAll         : false,
        showTreeExpandNoChildren: false,
        showTreeRowHeader       : false,
        columnDefs              : [
          {
            displayName : 'place',
            name        : 'place',
            cellTemplate: placeCellTemplate
          },
          {
            displayName: 'employee',
            name       : 'employee'
          },
          {
            displayName: 'workstation',
            name       : 'workstation'
          },
          {
            displayName: 'status',
            name       : 'status'
          },
          {
            displayName: 'action',
            name       : 'action'
          }
        ]
      };
    }
  };
}
