(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesDlpRejectedController', inboxJamesDlpRejectedController);

  function inboxJamesDlpRejectedController(
    inboxJamesDlpService,
    INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES
  ) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      self.mailRepositoryPath = inboxJamesDlpService.getMailRepositoryPath(INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES.REJECTED);
    }
  }
})(angular);
