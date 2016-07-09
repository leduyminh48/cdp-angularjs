export default class ButtonBackCtrl {
  /**
   * @ngdoc controller
   * @name osmButtonBack.ButtonBackCtrl
   * @class
   *
   * @description Controller for button that
   *              goes back to prev state
   */
  /*@ngInject*/
  constructor($window) {
    this.$window = $window;
  }

  handleClick() {
    this.$window.history.back();
  }
}
