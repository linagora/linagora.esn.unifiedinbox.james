(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .run(function(inboxCustomRoleMailboxService, INBOX_RESTORED_MESSAGES_MAILBOX) {
      inboxCustomRoleMailboxService.add(INBOX_RESTORED_MESSAGES_MAILBOX);
    });
})();
