import angular   from 'angular';
import 'angular-ui-grid/ui-grid.min';

import tableComponent       from './table.component';
import gridOptionsDecorator from './ui-grid-options.decorator';
import gridDecorator        from './ui-grid-class.decorator';

import './table.less';

/**
 * @ngdoc overview
 * @name osmTable
 *
 * @description
 * Hold component for generating tables
 */
export default angular.module('osmTable', [
  'ui.grid',
  'ui.grid.selection',
  'ui.grid.treeView',
  'ui.grid.autoResize'
])
  .decorator('GridOptions', gridOptionsDecorator)
  .decorator('Grid', gridDecorator)
  .component('osmTable', tableComponent)
  .name;
