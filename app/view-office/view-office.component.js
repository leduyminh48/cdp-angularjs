import controller  from './view-office.component';
import templateUrl from './view-office.tpl.html';


/**
 * @ngdoc directive
 * @name osmViewOffice.osmViewOffice
 * @scope
 *
 * @description Component for office view
 */
export default {
  url       : '/offices/:mode',
  'abstract': true,

  controller,
  templateUrl,
  controllerAs: 'view'
};
