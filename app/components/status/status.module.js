import angular   from 'angular';

import roomStatusComponent from './room-status.component.js';
import requestStatusComponent from './request-status.component.js';
import statusFct       from './status.service.js';
import './status.less';

/**
 * @ngdoc overview
 * @name osmStatus
 *
 * @description
 * Hold component for generating status for room and request
 */
const languageCode = 'en';//TODO: Implement i18n when possible

export default angular.module('osmStatus', []) //eslint-disable-line angular/file-name
  .constant('roomStatusClassPrefixConst', 'oui-room-status--')
  .constant('indicatorTypePrefixConst', 'oui-status-indicator--')
  .constant('roomStatusNameMapConst', {
    en: {
      OCCUPIED : 'occupied',
      FREE     : 'free',
      RESERVED : 'reserved',
      TECHNICAL: 'technical',
      DISABLED : 'disabled'
    }
  }[languageCode])
  .constant('requestStatusNameMapConst', {
    en: {
      SUBMITTED  : 'Submitted',
      PENDING    : 'Pending for approval',
      IN_PROGRESS: 'In progress',
      COMPLETED  : 'Completed',
      CANCELLED  : 'Cancelled'
    }
  }[languageCode])
  .constant('requestStatusDescriptionConst', {
    en: {
      SUBMITTED  : 'The request submitted. You have 5 minutes to change it. After that, no changes can be applied.',
      PENDING    : 'The swap request is pending for approval by other participants.',
      IN_PROGRESS: 'The request processing in progress.',
      COMPLETED  : 'The request successfully completed.',
      CANCELLED  : 'The request canceled.'
    }
  }[languageCode])
  .constant('requestInProgressTypeToClassConst', {
    PENDING: 'blocked-middle',
    BLOCKED: 'blocked-end',
    VALID  : 'valid'
  })
  .factory('statusFct', statusFct)
  .component('osmRoomStatus', roomStatusComponent)
  .component('osmRequestStatus', requestStatusComponent)
  .name;
