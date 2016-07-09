export default
/*@ngInject*/function statusFct($injector) {
  /**
   * @ngdocs service
   * @name osmStatus.statusFct
   */

  const roomStatusClassPrefixConst        = $injector.get('roomStatusClassPrefixConst');
  const requestStatusDescriptionConst     = $injector.get('requestStatusDescriptionConst');
  const indicatorTypePrefixConst          = $injector.get('indicatorTypePrefixConst');
  const requestInProgressTypeToClassConst = $injector.get('requestInProgressTypeToClassConst');

  return {
    /**
     * @ngdoc method
     * @name osmStatus.statusFct#getRoomCssClass
     * @methodOf osmStatus.statusFct
     *
     * @param {string} statusCode Room Status Code
     * @returns {string} css class for room status badges
     *
     * @description generate css class for room status badges from status code
     */
    getRoomCssClass(statusCode) {
      return `${ roomStatusClassPrefixConst }${ statusCode.toLowerCase() }`;
    },


    /**
     * @ngdoc method
     * @name osmStatus.statusFct#getStatusName
     * @methodOf osmStatus.statusFct
     *
     * @param {string} statusMap Object to map status name to status code
     * @param {string} statusCode Status Code
     * @returns {string} status name
     *
     * @description look up status name based on type of status, status code
     */
    getStatusName({ statusMap, statusCode }) {
      return statusMap[statusCode];
    },


    /**
     * @ngdoc method
     * @name osmStatus.statusFct#getStatusDescription
     * @methodOf osmStatus.statusFct
     *
     * @param {string} statusName Name of the status to get description for
     * @returns {string} status description
     *
     * @description determines status description for the passed in status name
     */
    getStatusDescription(statusName) {
      return requestStatusDescriptionConst[statusName];
    },


    /**
     * @ngdoc method
     * @name osmStatus.statusFct#getInProgressCssClass
     * @methodOf osmStatus.statusFct
     *
     * @param {string} indicatorType Type of indicator
     * @returns {string} css class for in-progress indicator
     *
     * @description generate css class for in-progress indicator based on type of in-progress
     */
    getIndicatorCssClass(indicatorType) {
      return `${ indicatorTypePrefixConst }${ requestInProgressTypeToClassConst[indicatorType] }`;
    }
  };
}
