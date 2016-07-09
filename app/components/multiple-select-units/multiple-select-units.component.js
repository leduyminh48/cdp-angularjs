import controller         from './multiple-select-units.controller';
import defaultTemplateUrl from './multiple-select-units-default.tpl.html';


/**
 * @ngdoc directive
 * @name osmMultipleSelectUnits.osmMultipleSelectUnits
 * @scope
 *
 * @description Component for units multiple selection
 */
export default {
  controller,
  templateUrl : defaultTemplateUrl,
  controllerAs: 'multi',
  bindings    : {
    initType  : '<',
    startType : '<',
    finishType: '<',
    units     : '=',
    onChange  : '&',
    onFinish  : '&'
  }
};
