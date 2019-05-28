(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDeletedMessagesCriteriaItem', {
      templateUrl: '/linagora.esn.unifiedinbox.james/app/deleted-messages/criteria/item/inbox-james-deleted-messages-criteria-item.html',
      bindings: {
        availableCriteria: '<',
        criterion: '='
      }
    });
})(angular);
