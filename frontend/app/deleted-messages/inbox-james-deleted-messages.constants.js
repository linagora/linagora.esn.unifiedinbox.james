(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .constant('INBOX_JAMES_DELETED_MESSAGES', {
      COMBINATOR: 'and',
      CRITERIA: [{
        id: 'subject:contains',
        fieldName: 'subject',
        label: 'Subject containing',
        operator: 'contains'
      }, {
        id: 'subject:containsIgnoreCase',
        fieldName: 'subject',
        label: 'Subject containing (ignore case)',
        operator: 'containsIgnoreCase'
      }, {
        id: 'subject:equals',
        fieldName: 'subject',
        label: 'Subject equals',
        operator: 'equals'
      }, {
        id: 'subject:equalsIgnoreCase',
        fieldName: 'subject',
        label: 'Subject equals (ignore case)',
        operator: 'equalsIgnoreCase'
      }]
    });
})(angular);
