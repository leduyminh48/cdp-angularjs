import templateUrl from './places-distibution.tpl.html';

class controller {
  /**
   * @ngdoc controller
   * @name osmPlacesDistribution.PlacesDistributionCtrl
   *
   * @class
   * @description
   * Controller for work places distribution
   */
  /*@ngInject*/
  constructor() { //eslint-disable-line no-useless-constructor

  }

  /**
   * @ngdoc method
   * @methodOf osmPlacesDistribution.ViewRequestsListCtrl
   * @name osmPlacesDistribution.PlacesDistributionCtrl#getTotalPlacesCount
   * @returns {number} Total places count
   */
  getTotalPlacesCount() {
    let totalPlacesCount = 0;

    for (const places in this.placesData) { //eslint-disable-line no-restricted-syntax
      if (this.placesData.hasOwnProperty(places)) {
        totalPlacesCount += this.placesData[places];
      }
    }

    return totalPlacesCount;
  }

  /**
   * @ngdoc method
   * @methodOf osmPlacesDistribution.ViewRequestsListCtrl
   * @name osmPlacesDistribution.PlacesDistributionCtrl#calculateItemWidth
   * @param {number} placesCount Amount of places
   * @returns {number} Width for the item
   * @description - Calculates the width for the certain places item based on the whole items sum (100%)
   */
  calculateItemWidth(placesCount) {
    const totalPlacesCount = this.getTotalPlacesCount();

    return (placesCount / totalPlacesCount) * 100;
  }
}

/**
 * @ngdoc directive
 * @name osmPlacesDistribution.osmPlacesDistribution
 *
 * @scope
 *
 * @description
 * Component to render work places distribution
 */
export default {
  templateUrl,
  controller,
  bindings: {
    placesData: '<'
  },
  controllerAs: 'view'
};
