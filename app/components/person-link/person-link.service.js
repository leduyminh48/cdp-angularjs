import angular from 'angular';

export default /*@ngInject*/function linkFct(telescopePersonUrlConst, upsaPersonConst) {
  /**
   * @ngdocs service
   * @name osmPersonLink.linkFct
   */
  return {
    /**
     * @ngdoc method
     * @name osmPersonLink.linkFct#transformToUnderscored
     * @methodOf personGetLink.linkFct
     *
     * @param {string} spacedString String with spaces as separators
     * @returns {string} string with underscores as separators between words
     *
     * @description transform strings with spaces as separators between words to strings
     * where underscores are separators between words
     */
    transformToUnderscored(spacedString) {
      return (angular.isDefined(spacedString)) ? spacedString.toLowerCase().split(' ').join('_') : '';
    },


    /**
     * @ngdoc method
     * @name osmPersonLink.linkFct#getToTelescope
     * @methodOf personGetLink.linkFct
     *
     * @param {string} personName Name of the person to get profile link for
     * @returns {string} URL to personal Telescope page
     *
     * @description Creates link to a person telescope profile
     */
    getToTelescope(personName) {
      return `${ telescopePersonUrlConst }/${ this.transformToUnderscored(personName) }`;
    },


    /**
     * @ngdoc method
     * @name osmPersonLink.linkFct#transformToUrlParams
     * @methodOf personGetLink.linkFct
     *
     * @param {Object} object Object to transform
     * @returns {string} Url parameters string
     *
     * @description Transforms an object to a string in format of url parameters. Doesn't add ? at the beginning
     */
    transformToUrlParams(object) {
      return Object.keys(object)
        .map(key => `${ key }=${ object[key] }`)
        .join('&');
    },


    /**
     * @ngdoc method
     * @name osmPersonLink.linkFct#getToUpsa
     * @methodOf personGetLink.linkFct
     *
     * @param {string} personName Name of the person to get profile link for
     *
     * @returns {string} URL personal UPSA page
     */
    getToUpsa(personName) {
      const params = this.transformToUrlParams({
        [upsaPersonConst.personParam]: personName
      });

      return `${ upsaPersonConst.url }?${ params }`;
    }
  };
}
