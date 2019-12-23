(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesMailRepository', {
      templateUrl: '/unifiedinbox.james/app/mail-repository/inbox-james-mail-repository.html',
      controller: 'inboxJamesMailRepositoryController',
      bindings: {
        repository: '<'
      }
    });
})(angular);
