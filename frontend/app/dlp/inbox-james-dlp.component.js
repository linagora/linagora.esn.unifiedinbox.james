(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDlp', {
      templateUrl: '/linagora.esn.unifiedinbox.james/app/dlp/inbox-james-dlp.html',
      bindings: {
        displayIn: '<'
      }
    });
})(angular);
