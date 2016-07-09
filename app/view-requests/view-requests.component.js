import controller  from './view-requests.controller';
import templateUrl from './view-requests.tpl.html';


/**
 * @ngdoc directive
 * @name osmViewRequests.osmViewRequests
 * @scope
 *
 * @description Component for requests view
 */
export default {
  url       : '/requests',
  'abstract': true,

  controller,
  templateUrl,
  controllerAs: 'view'
};
