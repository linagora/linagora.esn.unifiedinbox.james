(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .constant('INBOX_JAMES_MAIL_REPOSITORY_EMAIL_FIELDS', ['headers', 'textBody', 'htmlBody', 'attributes'])

  .constant('INBOX_JAMES_MAIL_REPOSITORY_EVENTS', {
    MAILS_REMOVED: 'inbox-james:mail-repository:mails:removed',
    ALL_MAILS_REMOVED: 'inbox-james:mail-repository:all-mails:removed'
  })

  .constant('INBOX_JAMES_MAIL_REPOSITORY_MAIL_DELETION_TARGET', {
    ALL: 'all',
    SINGLE: 'single',
    MULTIPLE: 'multiple'
  })

  .constant('INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS', {
    TRANSPORT: 'transport',
    QUARANTINE: 'dlpQuarantine',
    REJECT: 'dlpReject'
  });
})(angular);
