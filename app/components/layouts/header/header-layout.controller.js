/**
 * @ngdoc controller
 * @name osmLayouts.HeaderLayoutCtrl
 * @class
 *
 * @description Controller for header component
 */
export default class HeaderLayoutCtrl {
  /*@ngInject*/
  constructor($state) {
    this.$state = $state;
  }


  /**
   * @ngdoc method
   * @methodOf osmLayouts.HeaderLayoutCtrl
   * @name osmLayouts.HeaderLayoutCtrl#linkIsActive
   *
   * @param {string} link Link to check
   *
   * @returns {boolean} true if link is active
   * @description checks Link whether it is active via router
   */
  linkIsActive(link) {
    return this.$state.includes(link);
  }


  $onInit() {
  }
}
