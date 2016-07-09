import angular from 'angular';
import module  from '../multiple-select.module';

import templateUrl from './multiple-select-example.tpl.html';


class MultipleSelectExampleCtrl {
  /*@ngInject*/
  constructor(multipleSelectExampleFct) {
    this.resource = multipleSelectExampleFct;
    this.groups   = [];

    this.load(-1);
  }


  onSelect(groupIndex/*, item*/) {
    if (groupIndex >= this.groups.length) {
      return;
    }

    this.load(groupIndex);
  }


  load(groupIndex) {
    const query = this.resource.query();

    query
      .$promise
      .then(data => {
        //hack to use the same query with all groups
        this.groups[groupIndex + 1] = data[groupIndex + 1];
        /* || {
         title: ''
         };*/
      });

    return query;
  }
}


/*@ngInject*/
function multipleSelectExampleFct($resource) {
  return $resource('http://beta.json-generator.com/api/json/get/VyZBRS-7b');
}


export default angular.module('osmMultipleSelectExample', [  //eslint-disable-line angular/file-name
  module
])
  .factory('multipleSelectExampleFct', multipleSelectExampleFct)
  .component('osmMultipleSelectExample', {
    templateUrl,
    controller  : MultipleSelectExampleCtrl,
    controllerAs: 'example'
  })
  .name;
