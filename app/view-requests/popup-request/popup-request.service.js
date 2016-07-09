export default /*@ngInject*/function requestPopupFct(UnitsFct, EmployeesFct) {
  /**
   * @ngdoc service
   * @name osmViewRequestPopup.requestPopupFct
   *
   * @description factory for request popup
   */
  return {
    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.requestPopupFct
     * @name osmViewRequestPopup.requestPopupFct#getRoomOwner
     *
     * @description This method returning room owner
     */
    getRoomOwner() {
      return EmployeesFct.getByIdMock(1);
    },


    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.requestPopupFct
     * @name osmViewRequestPopup.requestPopupFct#getOccupiedBy
     *
     * @description This method returning an owner of selected place
     */
    getOccupiedBy() {
      return EmployeesFct.getByIdMock(2);
    },


    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.requestPopupFct
     * @name osmViewRequestPopup.requestPopupFct#prepareMoveTo
     *
     * @description This method returning prepared place for "Move to" field
     */
    prepareMoveTo(places) {
      return UnitsFct.getPlaceResourcesMock(places);
    },


    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.requestPopupFct
     * @name osmViewRequestPopup.requestPopupFct#getAreaFromPlaceArray
     *
     * @param {Array} places place array
     *
     * @description This method returning the area object from place array
     */
    getAreaFromPlaceArray(places) {
      return places.find(item => item.type === 'area');
    }
  };
}
