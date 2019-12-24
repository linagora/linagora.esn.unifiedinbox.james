(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDlp', {
      templateUrl: '/unifiedinbox.james/app/dlp/inbox-james-dlp.html',
      bindings: {
        displayIn: '<'
      }
    });
})(angular);
