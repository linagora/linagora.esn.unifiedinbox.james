(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDeletedMessagesCriteriaForm', {
      templateUrl: '/unifiedinbox.james/app/deleted-messages/criteria/form/inbox-james-deleted-messages-criteria-form.html',
      controller: 'InboxJamesDeletedMessagesCriteriaFormController',
      bindings: {
        criteria: '='
      }
    });
})(angular);
