(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesDlpQuarantineController', inboxJamesDlpQuarantineController);

  function inboxJamesDlpQuarantineController(INBOX_JAMES_DLP_MAIL_REPOSITORIES) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      self.mailRepository = INBOX_JAMES_DLP_MAIL_REPOSITORIES.QUARANTINE;
    }
  }
})(angular);
