(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('InboxJamesDeletedMessagesCriteriaItemController', InboxJamesDeletedMessagesCriteriaItemController);

  function InboxJamesDeletedMessagesCriteriaItemController(inboxJamesDeletedMessageCriteriaService, INBOX_JAMES_DELETED_MESSAGES) {
    var self = this;

    self.types = INBOX_JAMES_DELETED_MESSAGES.CRITERIA.FIELD_NAMES;

    self.getCriterionSummary = function() {
      return inboxJamesDeletedMessageCriteriaService.getCriterionSummary(self.criterion);
    };
  }
})(angular);
