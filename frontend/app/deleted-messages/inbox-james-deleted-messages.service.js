(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .service('inboxJamesDeletedMessagesService', inboxJamesDeletedMessagesService);

  function inboxJamesDeletedMessagesService(inboxJamesRestangular) {
    return {
      submitRestoringRequest: submitRestoringRequest
    };

    function submitRestoringRequest(targetUser, content) {
      return inboxJamesRestangular.all('restoringDeletedMessagesRequest').customPOST({
        targetUser: targetUser,
        content: content
      });
    }
  }
})(angular);
