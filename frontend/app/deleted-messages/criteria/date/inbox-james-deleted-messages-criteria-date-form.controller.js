(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesDeletedMessagesCriteriaDateFormController', inboxJamesDeletedMessagesCriteriaDateFormController);

  function inboxJamesDeletedMessagesCriteriaDateFormController(esnI18nDateFormatService) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      self.dateFormat = esnI18nDateFormatService.getDateFormat();
    }
  }
})(angular);
