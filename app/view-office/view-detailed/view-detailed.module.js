import angular from 'angular';

import areaListComponent         from './view-detailed.component';
import areasTableSettingsService from './detailed-table/view-detailed-table-settings.service';

import models from '../office-models';

import './view-detailed.less';

/**
 * @ngdocs overview
 * @name osmViewOfficeDetailed
 *
 * @description
 * Module view office detailed. Could show detailed view of any unit
 */
export default angular.module('osmViewOfficeDetailed', [ //eslint-disable-line angular/file-name
  models
])

  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.office.detailed', areaListComponent);
  })
  .factory('areasTableSettingsFct', areasTableSettingsService)
  .name;
