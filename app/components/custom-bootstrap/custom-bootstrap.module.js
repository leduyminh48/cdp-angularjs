import angular from 'angular';
import 'angular-ui-bootstrap';

import tooltipConfig    from './tooltip.config';

import './custom-bootstrap.less';

export default angular.module('osmCustomBootstrap', ['ui.bootstrap'])
  .config(tooltipConfig)
  .name;
