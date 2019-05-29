(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('InboxJamesDeletedMessagesRestoreController', InboxJamesDeletedMessagesRestoreController);

  function InboxJamesDeletedMessagesRestoreController(
    session,
    asyncAction,
    inboxJamesDeletedMessagesService,
    INBOX_JAMES_DELETED_MESSAGES
  ) {
    var self = this;
    var SUBMIT_MESSAGES = {
      progressing: 'Submitting request...',
      success: 'Request submitted',
      failure: 'Failed to submit request'
    };

    self.$onInit = $onInit;

    function $onInit() {
      self.criteria = [];
    }

    self.onRecoverBtnClick = onRecoverBtnClick;
    self.onCancelBtnClick = onCancelBtnClick;

    function onRecoverBtnClick() {
      return asyncAction(SUBMIT_MESSAGES, function() {
        return _submitRecoverRequest();
      }).then(function() {
        _resetCriteria();
      });
    }

    function onCancelBtnClick() {
      _resetCriteria();
    }

    function _submitRecoverRequest() {
      var criteria = self.criteria.map(function(criterion) {
        return {
          fieldName: criterion.fieldName,
          operator: criterion.operator,
          value: criterion.value
        };
      });

      var requestContent = {
        combinator: INBOX_JAMES_DELETED_MESSAGES.COMBINATOR,
        criteria: criteria
      };

      return inboxJamesDeletedMessagesService.submitRestoringRequest(session.user._id, requestContent);
    }

    function _resetCriteria() {
      self.criteria = [];
    }
  }
})(angular);
