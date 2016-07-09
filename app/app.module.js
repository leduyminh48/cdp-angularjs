import angular          from 'angular';
import componentsModule from './components';
import viewMain         from './view-main';
import viewRequests     from './view-requests';
import viewOffice       from './view-office';
import viewSearch       from './view-search';
import viewAdmin        from './view-admin';

angular.module('osmApp', [
  componentsModule,
  viewMain,
  viewRequests,
  viewOffice,
  viewSearch,
  viewAdmin
])
  .value('$routerRootComponent', 'osmViewMain')
  /**
   * If you need to switch debug info on - use angular.reloadWithDebugInfo()
   */
  .config(/*@ngInject*/($compileProvider, routerStatusFctProvider) => {
    $compileProvider.debugInfoEnabled(routerStatusFctProvider.isLocalRun());
  });
