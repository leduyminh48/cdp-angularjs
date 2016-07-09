import angular from 'angular';
import module  from '../search.module';

import templateUrl from './people-search-example.tpl.html';


class PeopleSearchExampleCtrl {
  /*@ngInject*/
  constructor(osmPeopleSearchExampleResourceFct, photoBaseUrl) {
    this.initial = { fullname: 'Duy Minh Le' };
    this.selected = this.initial;
    this.options = {
      limit: 5,
      sort: 'fullname|asc'
    };
    this.resource = osmPeopleSearchExampleResourceFct;
    this.photoBaseUrl = photoBaseUrl;
    this.searchDisability = false;
    this.searchClearability = true;
  }
  setSelected(match) {
    this.selected = match;
  }

  getPhotoUrl(item) {
    return `url(${ this.photoBaseUrl }/${ item.employeeId })`;
  }
  onQuery(query) {
    const params = Object.assign({ query }, this.options);

    return this.resource
      .query(params)
      .$promise
      .then(response =>
        response.map(item => {
          item.photoUrl = this.getPhotoUrl(item);

          return item;
        })
      );
  }
}
const osmPeopleSearchExampleResourceFct = /*@ngInject*/($resource, osmPeopleSearchExampleResourceUrl) =>
  $resource(osmPeopleSearchExampleResourceUrl);

export default angular.module('osmPeopleSearchExample', [module]) //eslint-disable-line angular/file-name
  .factory('osmPeopleSearchExampleResourceFct', osmPeopleSearchExampleResourceFct)
  .constant('osmPeopleSearchExampleResourceUrl', 'http://www.json-generator.com/api/json/get/claYiTFgeq')
  .constant('photoBaseUrl', 'https://upsa.epam.com/workload/photo')
  .component('osmPeopleSearchExample', {
    templateUrl,
    controller  : PeopleSearchExampleCtrl,
    controllerAs: 'example'
  })
  .name;
