import angular from 'angular';
import modals  from 'components/modals';

import viewCtrl              from './popup-request.controller';
import requestPopupFct       from './popup-request.service.js';
import movementPopupTemplate from './popup-request-movement.tpl.html';
import swapPopupTemplate     from './popup-request-swap.tpl.html';

import moveTo from './move-to';

import './popup-request.less';
import components from 'components';

/**
 * @ngdocs overview
 * @name osmViewRequestPopup
 *
 * @description
 * Module for request popup view
 */
export default angular.module('osmViewRequestPopup', [ //eslint-disable-line angular/file-name
  modals,
  moveTo,
  components
])

  .factory('requestPopupFct', requestPopupFct)
  /**
   * @ngdoc service
   * @name osmViewRequestPopup.osmRequestPopupFct
   *
   * @description
   * Service to open popups for requests creation
   */
  .factory('osmRequestPopupFct', /*@ngInject*/(osmModalsFct, RequestsFct) => ({
    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.osmRequestPopupFct
     * @name osmViewRequestPopup.osmRequestPopupFct#open
     *
     * @description Opens a dialog to edit request. If no id is provided new request is created
     */
    open({ type = RequestsFct.TYPE_MOVEMENT, id }) {
      const request     = this.getRequest({ id, type });
      const templateUrl = this.getTemplate(type);
      const title       = this.getTitle(type);

      return osmModalsFct.open({
        title,
        note        : this.getNote(),
        templateUrl,
        controller  : viewCtrl,
        controllerAs: 'view',
        resolve     : {
          request
        }
      });
    },


    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.osmRequestPopupFct
     * @name osmViewRequestPopup.osmRequestPopupFct#getRequest
     *
     * @private
     * @description Returns an instance of the request with given id or creates a new one with given type
     */
    getRequest({ id, type }) {
      if (id) {
        return RequestsFct.getByIdMock(id);
      }

      return RequestsFct.create({ type });
    },


    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.osmRequestPopupFct
     * @name osmViewRequestPopup.osmRequestPopupFct#getTitle
     *
     * @private
     * @description
     */
    getTitle(type) {
      return type === RequestsFct.TYPE_SWAP ? 'Swap Request' : 'Movement Request';
    },


    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.osmRequestPopupFct
     * @name osmViewRequestPopup.osmRequestPopupFct#getTemplate
     *
     * @private
     * @description
     */
    getTemplate(type) {
      return type === RequestsFct.TYPE_SWAP ? swapPopupTemplate : movementPopupTemplate;
    },


    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.osmRequestPopupFct
     * @name osmViewRequestPopup.osmRequestPopupFct#getNote
     *
     * @private
     * @description
     */
    getNote() {
      return 'once request is submitted to workplace ‘To’ becomes ‘Reserved ’' +
        ' and the workplace ‘From’ remains ‘Occupied’ until movement is complete by Employee.';
    },

    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.osmRequestPopupFct
     * @name osmViewRequestPopup.osmRequestPopupFct#openMovementRequest
     *
     * @returns {$uibModalInstance} Instance of uibModal
     *
     * @description Opens dialog to create movement request
     */
    createMovementRequest() {
      return this.open({
        type: RequestsFct.TYPE_MOVEMENT
      });
    },


    /**
     * @ngdoc method
     * @methodOf osmViewRequestPopup.osmRequestPopupFct
     * @name osmViewRequestPopup.osmRequestPopupFct#createSwapRequest
     *
     * @returns {$uibModalInstance} Instance of uibModal
     *
     * @description Opens dialog to create swap request
     */
    createSwapRequest() {
      return this.open({
        type: RequestsFct.TYPE_SWAP
      });
    }
  }))
  .name;
