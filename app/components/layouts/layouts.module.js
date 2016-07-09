import angular from 'angular';
import router  from '../router';

import './layouts.less';

import headerComponent from './header/header-layout.component';
import footerComponent from './footer/footer-layout.component';
import tabsComponent   from './tabs/tabs-layout.component';

import contentHeaderComponent from './content-header/content-header-layout.component';


/**
 * @ngdocs overview
 * @name osmLayouts
 *
 * @description
 * Module for layout components like header or footer
 */
export default angular.module('osmLayouts', [
  router
])

  .component('osmHeader', headerComponent)
  .component('osmFooter', footerComponent)
  .component('osmContentHeader', contentHeaderComponent)
  .component('osmTabs', tabsComponent)
  .name;
