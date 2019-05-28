(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('InboxJamesDeletedMessagesCriteriaController', InboxJamesDeletedMessagesCriteriaController);

  function InboxJamesDeletedMessagesCriteriaController(
    INBOX_JAMES_DELETED_MESSAGES
  ) {
    var self = this;

    self.$onInit = $onInit;
    self.onAddBtnClick = onAddBtnClick;
    self.onRemoveBtnClick = onRemoveBtnClick;

    function $onInit() {
      self.criteria = self.criteria || [];
      self.availableCriteria = INBOX_JAMES_DELETED_MESSAGES.CRITERIA;
    }

    function onAddBtnClick() {
      self.criteria.unshift(angular.copy(INBOX_JAMES_DELETED_MESSAGES.CRITERIA[0]));
    }

    function onRemoveBtnClick(index) {
      self.criteria.splice(index, 1);
    }
  }
})(angular);
