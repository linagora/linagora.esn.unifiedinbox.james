(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .component('inboxJamesDeletedMessagesCriteriaSubjectForm', {
      templateUrl: '/unifiedinbox.james/app/deleted-messages/criteria/subject/inbox-james-deleted-messages-criteria-subject-form.html',
      bindings: {
        criterion: '<'
      }
    });
})(angular);
