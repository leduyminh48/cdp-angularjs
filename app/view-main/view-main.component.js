import templateUrl from './view-main.tpl.html';

class MainCtrl {
  /*@ngInject*/
  /**
   * @ngdoc controller
   *
   * @class
   * @description
   * Controller for Main component
   */
}


/**
 * @ngdoc directive
 * @name osmMain.osmMainLayout
 *
 * @scope
 *
 * @description
 * Component to render main layout
 */
export default {
  url       : '/app',
  'abstract': true,


  //todo: this is for loading user info before pages loading. Might be changed when move to component router
  resolve: {
    userInfo(/*@ngInject*/currentUserFct) {
      return currentUserFct.init();
    }
  },

  templateUrl,
  controller: MainCtrl
};
