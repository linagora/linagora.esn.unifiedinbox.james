(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('InboxJamesDeletedMessagesCriteriaItemController', InboxJamesDeletedMessagesCriteriaItemController);

  function InboxJamesDeletedMessagesCriteriaItemController(
    _,
    INBOX_JAMES_DELETED_MESSAGES
  ) {
    var self = this;

    self.onCriterionIdChange = onCriterionIdChange;
    self.$onInit = $onInit;

    function $onInit() {
      self.availableCriteria = INBOX_JAMES_DELETED_MESSAGES.CRITERIA;
    }

    function onCriterionIdChange() {
      var foundCriteria = angular.copy(_.find(INBOX_JAMES_DELETED_MESSAGES.CRITERIA, function(criterion) {
        return criterion.id === self.criterion.id;
      }));

      self.criterion.fieldName = foundCriteria.fieldName;
      self.criterion.operator = foundCriteria.operator;
      self.criterion.label = self.criterion.label;
    }
  }
})(angular);
