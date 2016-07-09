import angular from 'angular';

import viewComponent               from './view-tree.component';
import officesTableSettingsService from './tree-table/view-offices-table-settings.service';

import models from '../office-models';

import './view-tree.less';

/**
 * @ngdocs overview
 * @name osmViewOfficeTree
 *
 * @description
 * Module office tree view. This shows any units tree by id
 */
export default angular.module('osmViewOfficeTree', [  //eslint-disable-line angular/file-name
  models
])

  .config(/*@ngInject*/$stateProvider => {
    $stateProvider
      .state('main.office.tree', viewComponent);
  })
  .factory('officesTableSettingsFct', officesTableSettingsService)
  .name;
