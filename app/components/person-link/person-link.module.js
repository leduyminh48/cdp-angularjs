import angular   from 'angular';

import personTelecsopeComponent from './person-telescope-link.component';
import linksService             from './person-link.service.js';


/**
 * @ngdoc overview
 * @name osmPersonLink
 *
 * @description
 * Hold component for generating personal page's links
 */
export default angular.module('osmPersonLink', []) //eslint-disable-line angular/file-name

  .constant('telescopePersonUrlConst', 'http://telescope.epam.com/who')
  .constant('upsaPersonConst', {
    url        : 'https://upsa.epam.com/workload/employeeView.do',
    personParam: 'employeeId'
  })

  .factory('linkFct', linksService)
  .component('osmPersonTelescopeLink', personTelecsopeComponent)
  .name;
