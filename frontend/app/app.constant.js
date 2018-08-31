(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .constant('INBOX_MAIL_REPOSITORY_EMAIL_FIELDS', ['headers', 'textBody', 'htmlBody', 'attributes']);
})(angular);
