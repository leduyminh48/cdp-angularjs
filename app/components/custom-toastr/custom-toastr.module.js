import angular from 'angular';
import 'angular-toastr';
import 'angular-toastr/dist/angular-toastr.css';

import toastrTemplate from './toastr.tpl.html';

export default angular.module('osmCustomToastr', ['toastr'])
  .config(/*@ngInject*/toastrConfig => {
    angular.extend(toastrConfig, {
      allowHtml  : true,
      closeButton: true,
      debug      : false,
      onclick    : null,

      positionClass  : 'toast-bottom-right',
      showDuration   : 300,
      hideDuration   : 1000,
      timeOut        : 5000,
      extendedTimeOut: 10000,

      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
      templates : {
        toast      : toastrTemplate,
        progressbar: 'directives/progressbar/progressbar.html'
      }
    });
  })
  .name;
