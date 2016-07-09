import angular from 'angular';
import modals  from 'components/modals';

import viewCtrl    from './view-assign-ownership.controller';
import templateUrl from './view-assign-ownership.tpl.html';
/**
 * @ngdocs overview
 * @name osmViewAssignOwnership
 *
 * @description
 * Module for assign ownership view
 */
export default angular.module('osmViewAssignOwnership', [
  modals
])

  .factory('osmAssignOwnershipPopupFct', /*@ngInject*/osmModalsFct => ({
    open() {
      return osmModalsFct.open({
        templateUrl,
        controller: viewCtrl
      });
    }
  }))
  .name;
