(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDlpRejectedActions', {
      templateUrl: '/unifiedinbox.james/app/dlp/rejected/actions/inbox-james-dlp-rejected-actions.html',
      controller: 'inboxJamesDlpRejectedActionsController',
      bindings: {
        bulkAction: '<',
        email: '<',
        onClick: '&'
      }
    });
})(angular);
