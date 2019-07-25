(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDeletedMessagesRestoreRequestSubheader', {
      templateUrl: '/unifiedinbox.james/app/deleted-messages/restore-request/inbox-james-deleted-messages-restore-request-subheader.html',
      bindings: {
        onRequestSubmit: '&',
        form: '<'
      }
    });
})(angular);

