import controller  from './view-request.controller';
import templateUrl from './view-request.tpl.html';


/**
 * @ngdoc directive
 * @name osmViewRequest.osmViewRequest
 * @scope
 *
 * @description Component for request view
 */
export default {
  url       : '/details/:id',
  'abstract': true,

  controller,
  templateUrl,
  controllerAs: 'view'
};
