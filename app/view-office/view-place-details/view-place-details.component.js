import controller  from './view-place-details.controller';
import templateUrl from './view-place-details.tpl.html';


/**
 * @ngdoc directive
 * @name osmViewPlaceDetails.osmViewPlaceDetails
 * @scope
 *
 * @description Component for place details view
 */
export default {
  url       : '/details/:id',
  'abstract': true,

  controller,
  templateUrl,
  controllerAs: 'view'
};
