import angular    from 'angular';
import tabHistory from './tab-history.component';

import components from 'components';

/**
 * @ngdocs overview
 * @name osmOfficePlaceTabHistory
 *
 * @description
 * Module for office place history information tab
 */
export default angular.module('osmOfficePlaceTabHistory', [ // eslint-disable-line
  components
])
  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.office.details.history', tabHistory);
  })
  .name;
