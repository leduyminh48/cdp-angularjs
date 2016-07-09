import angular     from 'angular';
import templateUrl from './modal.tpl.html';
import confirmTpl  from './confirm.tpl.html';


/**
 * @ngdoc service
 * @name osmModals.osmModalsFct
 *
 * @description Service to open modals
 * This can be a complete hack. The reason why I did so - is an ability to easily move from popups to pages
 * Also I wanted to encapsulate some logic related to popups from controllers
 */
export default /*@ngInject*/$injector => {
  const $uibModal  = $injector.get('$uibModal');
  const $rootScope = $injector.get('$rootScope');
  const $q         = $injector.get('$q');

  const modalCtrlAs = 'osmModal';

  return {
    /**
     * @ngdoc method
     * @methodOf osmModals.osmModalsFct
     * @name osmModals.osmModalsFct#open
     *
     * @param {Object} [settings = {}] Settings for a popup. All settings as for $uibModal.open
     * @see $uibModal
     *
     * @param {string} [settings.controllerAs = '$ctrl'] Name of the property for controller instance
     * @param {Function} [settings.controller = angular.noop] Controller for a popup
     * @param {Object} [settings.scope = $rootScope] Scope parent for scope chain
     *
     * @param {string} [settings.backdrop = 'static'] Backdrop setting
     * @param {string} [settings.title = 'Need an action from you'] Title for a popup
     * @param {string} [settings.cancelTitle = 'Cancel'] Title for cancel button
     * @param {string} [settings.submitTitle = 'Ok'] Title for submit button
     * @param {string} settings.templateUrl Url for a template body for a popup
     *
     *
     * @description Opens modal window. Provides default skeleton for it
     * Also creates a scope between provided or root and modal's one and provides properties on it:
     * - $title title - for a popup
     * - $cancelTitle - title for a cancel button
     * - $submitTitle - title for a submit button
     * - $submit - method to submit modal. Should receive scope as parameter (this).
     * It will look for a controller instance on it
     */
    open(settings = {}) {
      const scope         = this.createChildScopeFrom(settings);
      const finalSettings = angular.extend({
        backdrop    : 'static',
        controllerAs: '$ctrl',
        controller  : angular.noop
      }, settings, {
        templateUrl,
        template: '',
        size    : 'lg',
        scope
      });

      this.getModalInstance(scope).submit = this.onSubmitWithController.bind(this, finalSettings.controllerAs);
      $uibModal.open(finalSettings);
    },


    /**
     * @methodOf osmModals.osmModalsFct
     * @name osmModals.osmModalsFct#onSubmitWithController
     *
     * @private
     *
     * @param {string} controllerAs Controller as property to get controller instance from the scope
     * @param {Object} scope Scope when submit was executed
     *
     * @description This is a hack method. We should get controller instance to call methods on it
     */
    onSubmitWithController(controllerAs, scope) {
      const controller = scope[controllerAs];
      const method     = this.getControllersMethod(controller, 'onSubmit');

      this.onSubmit(method, scope);
    },


    /**
     * @methodOf osmModals.osmModalsFct
     * @name osmModals.osmModalsFct#getControllersMethod
     *
     * @private
     *
     * @param {Object} controller Controller instance to call method from
     * @param {string} methodName Method name
     * @returns {?Function} Bound controller's method
     *
     * @description Checks whether controller exists and method exists on it and returns method with a given name
     * bound to it
     */
    getControllersMethod(controller, methodName) {
      if (!controller || !angular.isFunction(controller[methodName])) {
        return null;
      }

      return controller[methodName].bind(controller);
    },


    /**
     * @ngdoc method
     * @methodOf osmModals.osmModalsFct
     * @name osmModals.osmModalsFct#confirm
     *
     * @param {Object} [settings = {}] Settings for a popup
     *
     * @param {Object} [settings.scope = $rootScope] Scope parent for scope chain
     *
     * @param {string} [settings.backdrop = 'static'] Backdrop setting
     * @param {string} [settings.title = 'Are you sure?'] Title for a popup
     * @param {string} [settings.textConfirm] confirmation text
     * @param {string} [settings.cancelTitle = 'Cancel'] Title for cancel button
     * @param {string} [settings.submitTitle = 'Ok'] Title for submit button
     * @param {Function} [settings.onSubmit] Callback to call on submit. Can return promise
     *
     *
     * @description Opens modal window. Provides default skeleton for it
     * Also creates a scope between provided or root and modal's one and provides properties on it:
     * - $title title - for a popup
     * - $confirmText - content of confirmation
     * - $cancelTitle - title for a cancel button
     * - $submitTitle - title for a submit button
     * - $submit - method to submit modal. Should receive scope as parameter (this).
     */
    confirm(settings = {}) {
      const { backdrop = 'static' } = settings;
      const scope = this.createChildScopeFrom(angular.extend({
        title       : 'Are you sure?',
        templateUrl : confirmTpl,
        textConfirm : 'Continue?'
      }, settings));

      const finalSettings = {
        backdrop,
        templateUrl,
        scope
      };

      this.getModalInstance(scope).submit = this.onSubmit
        .bind(this, settings.onSubmit);
      $uibModal.open(finalSettings);
    },


    /**
     * @methodOf osmModals.osmModalsFct
     * @name osmModals.osmModalsFct#onSubmit
     *
     * @private
     *
     * @param {Function} [callback] Callback to call
     * @param {Object} scope Scope
     *
     * @description Sets isLoading on the scope and perform callback asynchronously. Closes modal on resolving and stops the spinner
     */
    onSubmit(callback, scope) {
      const modalInstance = this.getModalInstance(scope);

      modalInstance.isLoading = true;
      this.runMethodAsync(callback)
        .then(scope.$close)
        .catch(() => {
          modalInstance.isLoading = false;
        });
    },


    /**
     * @methodOf osmModals.osmModalsFct
     * @name osmModals.osmModalsFct#runMethodAsync
     *
     * @private
     *
     * @returns {Promise} Promise for async operation
     * @description Checks whether method exists and returns promise with this method calling result
     * Otherwise returns resolved promise - if there is no method we decide async operation performed already
     */
    runMethodAsync(method) {
      if (!angular.isFunction(method)) {
        return $q.resolve('No async actions');
      }

      return $q.resolve(method());
    },


    /**
     * @methodOf osmModals.osmModalsFct
     * @name osmModals.osmModalsFct#createChildScopeFrom
     *
     * @private
     *
     * @description This method creates scope between provided or root and modal's to provide bindings we needed for a popup
     */
    createChildScopeFrom({
      scope = $rootScope,
      title = 'Need an action from you',
      note  = null,
      templateUrl,
      textConfirm = 'Are you sure?',
      cancelTitle = 'Cancel',
      submitTitle = 'Ok'
      } = {}) {
      const newScope = scope.$new();

      newScope[modalCtrlAs] = {
        title,
        note,
        textConfirm,
        cancelTitle,
        submitTitle,
        templateUrl
      };

      return newScope;
    },


    /**
     * @methodOf osmModals.osmModalsFct
     * @name osmModals.osmModalsFct#getModalInstance
     *
     * @private
     *
     * @param {Object} scope Scope
     * @returns {Object} modal instance
     *
     * @description returns modal instance from the scope
     */
    getModalInstance(scope) {
      return scope[modalCtrlAs];
    }
  };
};
