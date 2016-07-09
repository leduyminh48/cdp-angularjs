import angular         from 'angular';
import customBootstrap from 'components/custom-bootstrap';

import peopleSearch    from './people-search.component';
import globalSearch    from './global-search.component';
import itemTemplateUrl from './people-search-item.tpl.html';

import './search.less';

const defaultConfigConst = {
  itemTemplateUrl,
  minInputLength: '3',
  waitMs: 500,
  modelOptions: {
    debounce: {
      'default': 500,
      blur: 250
    }
  }
};

/**
 * @ngdocs overview
 * @name osmPeopleSearch
 *
 * @description
 * Module for searching employee
 */
export default angular.module('osmPeopleSearch', [ //eslint-disable-line angular/file-name
  customBootstrap
])

  .constant('defaultConfigConst', defaultConfigConst)
  .component('osmPeopleSearch', peopleSearch)
  .component('osmGlobalSearch', globalSearch)
  .name;
