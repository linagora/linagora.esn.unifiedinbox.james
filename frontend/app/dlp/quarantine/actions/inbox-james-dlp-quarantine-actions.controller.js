(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesDlpQuarantineActionsController', inboxJamesDlpQuarantineActionsController);

  function inboxJamesDlpQuarantineActionsController(
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
    var repositoryId = inboxJamesDlpService.getMailRepositoryPath(INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES.QUARANTINE);
    var DENY_MESSAGES = {
      progressing: 'Moving mails...',
      success: 'Emails moved to rejected repository',
      failure: 'Failed to move mails'
    };
    var ALLOW_MESSAGES = {
      progressing: 'Scheduling mails delivery...',
      success: 'Delivery of mails scheduled',
      failure: 'Failed to schedule delivery'
    };

    self.onDenyBtnClick = onDenyBtnClick;
    self.onAllowBtnClick = onAllowBtnClick;

    function onDenyBtnClick() {
      return asyncAction(DENY_MESSAGES, function() {
        return _reprocessMails(INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.REJECT);
      });
    }

    function onAllowBtnClick() {
      return asyncAction(ALLOW_MESSAGES, function() {
        return _reprocessMails(INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.TRANSPORT);
      });
    }

    function _reprocessMails(processor) {
      if (self.onClick) self.onClick();

      if (self.bulkAction) {
        return jamesWebadminClient.reprocessAllMailsFromMailRepository(
          repositoryId,
          { processor: processor }
        ).then(function() {
          $rootScope.$broadcast(INBOX_JAMES_MAIL_REPOSITORY_EVENTS.ALL_MAILS_REMOVED);
        });
      }

      var selectedEmails = self.email ? [self.email] : inboxJamesMailRepositoryEmailSelection.getSelected();

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
