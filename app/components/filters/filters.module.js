/**
 * @ngdoc overview
 * @name osmFilters
 * @description
 *
 * Module for filters
 */
import angular from 'angular';

import acFilterMarkdown   from './markdown.filter.js';
import acFilterCapitalize from './capitilize.filter.js';
import acFilterUnderscore from './underscore.filter.js';

export default angular.module('osmFilters', []) //eslint-disable-line angular/file-name
  .filter('markdown',   acFilterMarkdown)
  .filter('capitalize', acFilterCapitalize)
  .filter('underscore', acFilterUnderscore)
  .name;
