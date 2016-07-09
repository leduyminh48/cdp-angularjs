import angular from 'angular';

import component      from './multiple-select-units.component.js';
import UnitSelect     from './unit-select.service.js';
import multipleSelect from '../multiple-select';
import models         from '../models';

/**
 * @ngdoc overview
 * @name osmMultipleSelectUnits
 *
 * @description
 * Hold component for generating control for selecting units
 */
export default angular.module('osmMultipleSelectUnits', [ //eslint-disable-line angular/file-name
  multipleSelect,
  models
])
  .factory('UnitSelectFct', UnitSelect)
  .component('osmMultipleSelectUnits', component)
  .name;
