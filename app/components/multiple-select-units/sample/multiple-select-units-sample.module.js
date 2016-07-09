import angular from 'angular';
import module  from '../multiple-select-units.module';

import templateUrl from './multiple-select-units-sample.tpl.html';


class MultipleSelectUnitsExampleCtrl {
  /*@ngInject*/
  constructor($log, UnitsFct, PlacesFct) {
    this.startType  = UnitsFct.TYPE_OFFICE;
    this.finishType = PlacesFct.TYPE;
    this.initType   = UnitsFct.TYPE_OFFICE;

    this.setNewUnits();
    this.$log = $log;
  }

  onChange(unit) {
    this.$log.debug('On change unit: ', unit);
  }

  onFinish(unit) {
    this.$log.debug('On last unit select: ', unit);
  }

  setNewUnits() {
    // const firstGroup  = [{ id: 5, name: 'first' }, { id: 7, name: 'second' }];
    // const secondGroup = [{ id: 15, name: 'next' }, { id: 17, name: 'further' }];

    //todo: remove when the server is ready
    /*{
     list    : firstGroup,
     selected: firstGroup[1]
     }, {
     list    : secondGroup,
     selected: secondGroup[0]
     }*/
    this.units = [];
  }
}


export default angular.module('osmMultipleSelectSample', [  //eslint-disable-line angular/file-name
  module
])
  .component('osmMultipleSelectUnitsSample', {
    templateUrl,
    controller  : MultipleSelectUnitsExampleCtrl,
    controllerAs: 'sample'
  })
  .name;
