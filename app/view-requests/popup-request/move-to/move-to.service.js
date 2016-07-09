import angular from 'angular';

export default /*@ngInject*/function moveToFct(UnitsFct) {
  /**
   * @ngdocs service
   * @name osmMoveTo.moveToFct
   */
  return {
    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.requestPopupFct
     * @name osmViewRequestPopup.requestPopupFct#getGroup
     *
     * @param {string} type type of places
     * @return {Promise} list of places
     *
     * @description This method returns list of places by given type
     */
    getGroup(type = 'office') {
      return UnitsFct.getListByTypeMock(type);
    },
    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.requestPopupFct
     * @name osmViewRequestPopup.requestPopupFct#prepareGroup
     *
     * @param {Array} list list of place resources
     * @return {Object} prepared group object
     *
     * @description This method searching people by query in fullname property
     */
    prepareGroup(list) {
      const isList = angular.isArray(list);

      return {
        list,
        isList,
        isActive: true
      };
    }
  };
}
