export default /*@ngInject*/ function ViewRequestsListFct(osmModalsFct, RequestsFct, toastr, $interpolate) {
  return {
    /**
     * @ngdoc method
     * @methodOf osmViewRequestsList.viewRequestListFct
     * @name osmViewRequestsList.viewRequestListFct#confirmAction
     *
     * @description Factory for creating action confirm dialog
     */

    confirmAction({ requestId, action, title, callback = angular.noop }) {
      osmModalsFct.confirm({
        title,
        textConfirm: this.getTextConfirm({ requestId, action }),
        onSubmit   : () => {
          RequestsFct.executeMock(action, requestId).then(() => {
            callback();
            toastr.success(this.getTextToastr({ requestId, action }));
          });
        }
      });
    },

    confirmActionMultiple({ requests, action, title, callback = angular.noop }) {
      const length = requests.length;

      osmModalsFct.confirm({
        title,
        textConfirm: this.getTextConfirmMultiple({ action, length }),
        onSubmit   : () => {
          RequestsFct.executeMultipleMock(action, requests).then(() => {
            callback();
            toastr.success(this.getTextToastrMultiple({ action, length }));
          });
        }
      });
    },

    /**
     * @ngdoc method
     * @methodOf osmViewRequestsList.viewRequestListFct
     * @name osmViewRequestsList.viewRequestListFct#getTextConfirm
     *
     * @description Generate text confirm base on requestId and action
     */
    getTextConfirm: $interpolate('You are about to {{ action }} request {{ requestId }}. Continue?'),

    /**
     * @ngdoc method
     * @methodOf osmViewRequestsList.viewRequestListFct
     * @name osmViewRequestsList.viewRequestListFct#getTextConfirm
     *
     * @description Generate text toastr base on requestId and action
     */

    getTextToastr : $interpolate('Request {{ requestId }} {{ action }}d successfully'),

    /**
     * @ngdoc method
     * @methodOf osmViewRequestsList.viewRequestListFct
     * @name osmViewRequestsList.viewRequestListFct#getTextConfirm
     *
     * @description Generate text toastr base on number of requests and action
     */

    getTextToastrMultiple : $interpolate('Successfully {{ action }}d {{ length }} request'),

    /**
     * @ngdoc method
     * @methodOf osmViewRequestsList.viewRequestListFct
     * @name osmViewRequestsList.viewRequestListFct#getTextConfirm
     *
     * @description Generate text confirm base on number of requests and action
     */

    getTextConfirmMultiple : $interpolate('You are about to {{ action }} {{ length }} requests. Continue?')
  };
}
