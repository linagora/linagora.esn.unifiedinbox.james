(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesMailRepository', {
      templateUrl: '/linagora.esn.unifiedinbox.james/app/mail-repository/inbox-james-mail-repository.html',
      controller: 'inboxJamesMailRepositoryController',
      bindings: {
        path: '<'
      }
    });
})(angular);
