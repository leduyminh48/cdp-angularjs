import angular from 'angular';

export default class {
  /*@ngInject*/
  /**
   * @ngdoc service
   * @name osmRouter.RouterReusableCtrl
   * @class
   *
   * @description Parent controlelr for states which want to reuse the same controllers by jumping
   * with new search parameters. Emulates component router functionality
   * 'reloadOnSearch': true  option of the state definition object should be used
   */
  constructor($injector, $scope) {
    this.$scope    = $scope;
    this.$state    = $injector.get('$state');
    this.initRouterReuse();

    this.defaultParameters = {};
  }


  /**
   * @ngdoc method
   * @methodOf osmRouter.RouterReusableCtrl
   * @name osmRouter.RouterReusableCtrl#getParameters
   *
   * @returns {Object} Parameters
   *
   * @private
   * @description Gets state parameters overridden with defaultParameters
   * @todo: This should be moved to mixin or decorator
   */
  getParameters() {
    const stateParams = this.$state.params;

    return Object.keys(this.defaultParameters)
      .reduce((params, key) => {
        params[key] = angular.isDefined(stateParams[key]) ? stateParams[key] : this.defaultParameters[key];

        return params;
      }, {});
  }


  /**
   * @ngdoc method
   * @methodOf osmRouter.RouterReusableCtrl
   * @name osmRouter.RouterReusableCtrl#initRouterReuse
   *
   * @private
   * @description Init logic to reuse routing
   */
  initRouterReuse() {
    const destroyRouterChangeHandler = this.$scope.$on('$stateChangeSuccess', (...args) =>
      this.$routerCanReuse(...args));

    this.$scope.$on('$destroy', destroyRouterChangeHandler);
  }


  /**
   * @ngdoc method
   * @methodOf osmRouter.RouterReusableCtrl
   * @name osmRouter.RouterReusableCtrl#$routerCanReuse
   *
   * @param {Event} event Router transition event
   * @param {Object} toState Object of state configuration to jump to
   * @param {Object} toParams Object parameters for new state
   * @param {Object} fromState Object of state configuration to jump from
   *
   * @description Life cycle hook of the router.
   * Checks whether this router can be reused
   * This hook is almost the same as for component router but it calls onReuse manually.
   */
  $routerCanReuse(event, toState, toParams, fromState) {
    if (toState.name !== fromState.name) {
      return;
    }

    this.$routerOnReuse();
  }


  /**
   * @ngdoc method
   * @methodOf osmRouter.RouterReusableCtrl
   * @name osmRouter.RouterReusableCtrl#$routerOnReuse
   *
   * @description Life cycle hook of the router. Template method
   */
  $routerOnReuse() {
  }
}
