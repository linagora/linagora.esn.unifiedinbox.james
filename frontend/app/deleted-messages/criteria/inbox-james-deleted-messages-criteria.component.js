(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDeletedMessagesCriteria', {
      templateUrl: '/unifiedinbox.james/app/deleted-messages/criteria/inbox-james-deleted-messages-criteria.html',
      controller: 'InboxJamesDeletedMessagesCriteriaController',
      bindings: {
        criteria: '='
      }
    });
})(angular);
