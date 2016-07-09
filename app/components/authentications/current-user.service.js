/**
 * @ngdoc service
 * @name osmAuthentication#currentUserFct
 *
 * @class
 * @description Singleton - creates instance of CurrentUser and returns it
 */
export default /*@ngInject*/$injector => {
  /**
   * @ngdoc service
   * @name CurrentUser
   *
   * @class
   * @description Provides methods to access current user info. Is created by osmAuthentication#currentUserFct
   */
  class CurrentUser {
    constructor() {
      this.Employees = $injector.get('EmployeesFct');
      this.Units     = $injector.get('UnitsFct');
      this.$q        = $injector.get('$q');
    }


    /**
     * @ngdoc method
     * @methodOf CurrentUser
     * @name CurrentUser#init
     *
     * @returns {Promise}
     *
     * @description Init user info and returns promise for it loading
     */
    init() {
      this.info  = this.Employees.queryMockCurrent();
      this.place = this.Units.getCurrent();

      this.loading = this.$q.all([
        this.info.$promise,
        this.place.$promise
      ]);

      return this.loading.then(() => this);
    }


    /**
     * @ngdoc method
     * @methodOf CurrentUser
     * @name CurrentUser#
     *
     * @returns {string} User name
     *
     * @description Returns user name
     */
    getFullName() {
      return this.info.fullName;
    }


    /**
     * @ngdoc method
     * @methodOf CurrentUser
     * @name CurrentUser#
     *
     * @returns {*} Unit path
     *
     * @description Return unit path for currently logged in user
     */
    getUnitPath() {
      return this.place.unitPath
        .map(unit => unit.name); //todo: Need to use some method to get whole place path
    }


    /**
     * @ngdoc method
     * @methodOf CurrentUser
     * @name CurrentUser#getUnitName
     *
     * @returns {string} Unit name
     *
     * @description Returns unit name of currently logged in user
     */
    getUnitName() {
      return this.info.unit;
    }


    /**
     * @ngdoc method
     * @methodOf CurrentUser
     * @name CurrentUser#getAvatarUrl
     *
     * @returns {string} Url to an avatar image
     *
     * @description Returns avatar url of currently logged in user
     */
    getAvatarUrl() {
      return this.info.pictureName;
    }
  }

  return new CurrentUser();
};
