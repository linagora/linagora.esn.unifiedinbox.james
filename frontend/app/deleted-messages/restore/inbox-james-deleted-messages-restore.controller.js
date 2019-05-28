(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('InboxJamesDeletedMessagesRestoreController', InboxJamesDeletedMessagesRestoreController);

  function InboxJamesDeletedMessagesRestoreController($q, asyncAction) {
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
      });
    }

    function onCancelBtnClick() {
      _resetCriteria();
    }

    function _submitRecoverRequest() {
      _resetCriteria();

      return $q.when(); // TODO Implement this function when having restoring deleted messages endpoint
    }

    function _resetCriteria() {
      self.criteria = [];
    }
  }
})(angular);
