(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesMailRepositoryHeader', {
      templateUrl: '/unifiedinbox.james/app/mail-repository/header/inbox-james-mail-repository-header.html',
      controller: 'inboxJamesMailRepositoryHeaderController',
      bindings: {
        emails: '<',
        repository: '@'
      }
    });
})(angular);
