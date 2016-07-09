import angular    from 'angular';
import components from 'components';
import tables     from 'components/table';
import 'angular-ui-grid/ui-grid.min';

import viewComponent       from './view-requests-list.component';
import requestModule       from '../view-request-details';
import viewRequestListFct  from './view-request-list.service';

import requestsTableSettingsService from './requests-table/view-requests-table-settings.service';

import './view-requests-list.less';

/**
 * @ngdocs overview
 * @name osmViewRequestsList
 *
 * @description
 * Module requests list view
 */
export default angular.module('osmViewRequestsList', [ //eslint-disable-line angular/file-name
  components,
  tables,
  requestModule
])

  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.requests.list', viewComponent)
      .state('main.requests.list.parameters', {
        url         : '/:state?sortBy&sortOrder&pageNumber&pageSize&search',
        template    : '<span></span>',
        controller  : angular.noop,
        controllerAs: 'view'
      });
  })

  .factory('requestsTableSettingsFct', requestsTableSettingsService)
  .factory('viewRequestListFct', viewRequestListFct)
  .name;
