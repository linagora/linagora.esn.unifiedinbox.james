(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .constant('INBOX_JAMES_DLP_MAIL_REPOSITORIES', {
    QUARANTINE: 'dlpQuarantine',
    REJECTED: 'dlpRejected'
  });
})(angular);
