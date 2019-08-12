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
          { value: 'subject', label: 'Subject' },
          { value: 'hasAttachment', label: 'Attachment'},
          { value: 'recipients', label: 'Recipients' },
          { value: 'sender', label: 'Sender' }
        ],
        SUBJECT: 'subject',
        ATTACHMENT: 'hasAttachment',
        RECIPIENTS: 'recipients',
        SENDER: 'sender',
        RECIPIENTS_OPERATOR: 'contains',
        SENDER_OPERATOR: 'equals'
      }
    });
})(angular);
