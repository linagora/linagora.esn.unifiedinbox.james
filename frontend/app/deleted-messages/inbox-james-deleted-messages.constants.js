(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .constant('INBOX_JAMES_DELETED_MESSAGES', {
      COMBINATOR: 'and',
      CRITERIA: [{
        fieldName: 'subject',
        label: 'Subject containing',
        operator: 'contains'
      }, {
        fieldName: 'subject',
        label: 'Subject containing (ignore case)',
        operator: 'containsIgnoreCase'
      }, {
        fieldName: 'subject',
        label: 'Subject equals',
        operator: 'equals'
      }, {
        fieldName: 'subject',
        label: 'Subject equals (ignore case)',
        operator: 'equalsIgnoreCase'
      }]
    });
})(angular);
