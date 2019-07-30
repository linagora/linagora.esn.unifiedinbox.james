(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDeletedMessagesCriteriaParticipantForm', {
      templateUrl: '/unifiedinbox.james/app/deleted-messages/criteria/participant/inbox-james-deleted-messages-criteria-participant-form.html',
      controller: 'inboxJamesDeletedMessagesCriteriaParticipantFormController',
      bindings: {
        criterion: '<',
        participantType: '<'
      }
    });
})(angular);
