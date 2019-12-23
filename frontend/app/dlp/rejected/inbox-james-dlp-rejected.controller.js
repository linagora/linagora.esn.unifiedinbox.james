(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesDlpRejectedController', inboxJamesDlpRejectedController);

  function inboxJamesDlpRejectedController(INBOX_JAMES_DLP_MAIL_REPOSITORIES) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      self.mailRepository = INBOX_JAMES_DLP_MAIL_REPOSITORIES.REJECTED;
    }
  }
})(angular);
