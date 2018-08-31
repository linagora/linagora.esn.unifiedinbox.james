(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox')
    .controller('inboxJamesDlpQuarantineController', inboxJamesDlpQuarantineController);

  function inboxJamesDlpQuarantineController(
    inboxJamesDlp
  ) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      self.quarantineRepositoryPath = inboxJamesDlp.getQuarantineMailRepositoryPath();
    }
  }
})(angular);
