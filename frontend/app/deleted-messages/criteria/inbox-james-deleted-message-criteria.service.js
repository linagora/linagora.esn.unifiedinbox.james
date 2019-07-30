(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .factory('inboxJamesDeletedMessageCriteriaService', inboxJamesDeletedMessageCriteriaService);

  function inboxJamesDeletedMessageCriteriaService(esnI18nService, INBOX_JAMES_DELETED_MESSAGES) {
    return {
      getCriterionSummary: getCriterionSummary
    };

    function getCriterionSummary(criterion) {
      if (criterion.fieldName === INBOX_JAMES_DELETED_MESSAGES.CRITERIA.SUBJECT) {
        return _getSubjectCriterionSummary(criterion);
      }
    }

    function _getSubjectCriterionSummary(criterion) {
      var summary;

      switch (criterion.operator) {
        case 'contains':
          summary = 'Messages whose subjects contain exactly <b>%s</b>';
          break;

        case 'containsIgnoreCase':
          summary = 'Messages whose subjects contain <b>%s</b>';
          break;

        case 'equals':
          summary = 'Messages whose subjects match exactly <b>%s</b>';
          break;

        case 'equalsIgnoreCase':
          summary = 'Messages whose subjects match <b>%s</b>';
          break;

        default:
          summary = '';
      }

      return esnI18nService.translate(summary, criterion.value || '').toString();
    }
  }
})(angular);
