(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDlpQuarantineActions', {
      templateUrl: '/unifiedinbox.james/app/dlp/quarantine/actions/inbox-james-dlp-quarantine-actions.html',
      controller: 'inboxJamesDlpQuarantineActionsController',
      bindings: {
        bulkAction: '<',
        email: '<',
        onClick: '&',
        repository: '<'
      }
    });
})(angular);
