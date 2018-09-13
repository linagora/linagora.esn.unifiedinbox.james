(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesDlpRejectedActionsController', inboxJamesDlpRejectedActionsController);

  function inboxJamesDlpRejectedActionsController(
    $q,
    $rootScope,
    asyncAction,
    jamesWebadminClient,
    inboxJamesDlpService,
    inboxJamesMailRepositoryEmailSelection,
    INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS,
    INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES,
    INBOX_JAMES_MAIL_REPOSITORY_EVENTS
  ) {
    var self = this;
    var repositoryId = inboxJamesDlpService.getMailRepositoryPath(INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES.REJECTED);
    var REVISE_MESSAGES = {
      progressing: 'Moving mails...',
      success: 'Emails moved to quarantined repository',
      failure: 'Failed to move mails'
    };

    self.onQuarantineBtnClick = onQuarantineBtnClick;

    function onQuarantineBtnClick() {
      return asyncAction(REVISE_MESSAGES, function() {
        return _quarantineMails();
      });
    }

    function _quarantineMails() {
      var processor = INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.QUARANTINE;

      if (self.email) {
        self.onClick();

        return jamesWebadminClient.reprocessMailFromMailRepository(
          repositoryId,
          self.email.name,
          { processor: processor }
        ).then(function() {
          $rootScope.$broadcast(INBOX_JAMES_MAIL_REPOSITORY_EVENTS.MAILS_REMOVED, {
            emails: [self.email]
          });
        });
      }

      if (self.bulkAction) {
        return jamesWebadminClient.reprocessAllMailsFromMailRepository(
          repositoryId,
          { processor: processor }
        ).then(function() {
          $rootScope.$broadcast(INBOX_JAMES_MAIL_REPOSITORY_EVENTS.ALL_MAILS_REMOVED);
        });
      }

      var selectedEmails = inboxJamesMailRepositoryEmailSelection.getSelected();

      return $q.all(selectedEmails.map(function(email) {
        return jamesWebadminClient.reprocessMailFromMailRepository(
          repositoryId,
          email.name,
          { processor: processor }
        );
      })).then(function() {
        $rootScope.$broadcast(INBOX_JAMES_MAIL_REPOSITORY_EVENTS.MAILS_REMOVED, {
          emails: selectedEmails
        });
      });
    }
  }
})(angular);
