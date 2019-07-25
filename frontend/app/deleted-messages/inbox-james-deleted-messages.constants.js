(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .constant('INBOX_JAMES_DELETED_MESSAGES', {
      COMBINATOR: 'and',
      CRITERIA: {
        DEFAULT_CRITERION: {
          fieldName: 'subject',
          operator: 'containsIgnoreCase'
        },
        FIELD_NAMES: [
          { value: 'subject', label: 'Subject' }
        ],
        SUBJECT: 'subject'
      }
    });
})(angular);
