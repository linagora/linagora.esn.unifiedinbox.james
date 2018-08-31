(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesMailRepositoryEmailSelection', {
      templateUrl: '/linagora.esn.unifiedinbox.james/app/mail-repository/selection/inbox-james-mail-repository-email-selection.html',
      controller: 'inboxJamesMailRepositoryEmailSelectionController',
      bindings: {
        email: '<'
      }
    });
})(angular);
