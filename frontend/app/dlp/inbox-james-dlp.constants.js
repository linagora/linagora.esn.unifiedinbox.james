(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .constant('INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES', {
    QUARANTINE: 'var/mail/dlp/quarantine',
    REJECTED: 'var/mail/dlp/rejected'
  });
})(angular);
