(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesMailRepositoryHeader', {
      templateUrl: '/linagora.esn.unifiedinbox.james/app/mail-repository/header/inbox-james-mail-repository-header.html',
      controller: 'inboxJamesMailRepositoryHeaderController',
      bindings: {
        repository: '<',
        emails: '<'
      }
    });
})(angular);
