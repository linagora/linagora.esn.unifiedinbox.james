(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDeletedMessagesCriteriaItem', {
      templateUrl: '/unifiedinbox.james/app/deleted-messages/criteria/item/inbox-james-deleted-messages-criteria-item.html',
      controller: 'InboxJamesDeletedMessagesCriteriaItemController',
      bindings: {
        criterion: '<',
        deleteCriterion: '&'
      }
    });
})(angular);
