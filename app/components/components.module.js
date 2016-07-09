import angular from 'angular';
import 'angular-sanitize';

import './styles';

import controls           from './controls';
import authentications    from './authentications';
import router             from './router';
import customBootstrap    from './custom-bootstrap';
import customToastr       from './custom-toastr';
import modals             from './modals';
import serverInteraction  from './server-interaction';
import models             from './models';
import filters            from './filters';
import layouts            from './layouts';
import progressBar        from './progress-bar';
import multipleSelect     from './multiple-select';
import personLink         from './person-link';
import status             from './status';
import breadcrumb         from './breadcrumb';
import logout             from './logout';
import peopleSearch       from './search';
import table              from './table';
import placesDistribution from './places-distibution';

import multipleSelectUnits from './multiple-select-units';


export default angular.module('osmComponents', [
  'ngSanitize',
  router,

  filters,
  authentications,
  customBootstrap,
  customToastr,
  serverInteraction,
  models,

  controls,
  modals,
  layouts,
  progressBar,
  multipleSelect,
  personLink,
  status,
  breadcrumb,
  logout,
  peopleSearch,
  table,
  placesDistribution,
  multipleSelectUnits
])
  .name;
