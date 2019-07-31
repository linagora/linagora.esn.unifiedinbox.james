(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDeletedMessagesCriteriaAttachmentForm', {
      templateUrl: '/unifiedinbox.james/app/deleted-messages/criteria/attachment/inbox-james-deleted-messages-criteria-attachment-form.html',
      bindings: {
        criterion: '<'
      }
    });
})(angular);
