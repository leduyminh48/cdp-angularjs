import angular from 'angular';

import modelOfficesService from './model-office.service';
import modelAreaService    from './model-area.service';
import modelPlaceService   from './model-place.service';

/**
 * @ngdocs overview
 * @name osmViewOfficeModels
 *
 * @description
 * Module office models
 */
export default angular.module('osmViewOfficeModels', [])  //eslint-disable-line angular/file-name
  .factory('modelOfficesFct', modelOfficesService)
  .factory('modelAreaFct', modelAreaService)
  .factory('modelPlaceFct', modelPlaceService)

  .name;
