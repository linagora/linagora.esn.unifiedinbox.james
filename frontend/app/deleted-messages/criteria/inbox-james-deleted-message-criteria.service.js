(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .factory('inboxJamesDeletedMessageCriteriaService', inboxJamesDeletedMessageCriteriaService);

  function inboxJamesDeletedMessageCriteriaService(esnI18nService, INBOX_JAMES_DELETED_MESSAGES) {
    return {
      getCriterionSummary: getCriterionSummary
    };

    function getCriterionSummary(criterion) {
      var summary;

      switch (criterion.fieldName) {
        case INBOX_JAMES_DELETED_MESSAGES.CRITERIA.SUBJECT:
          summary = _getSubjectCriterionSummary(criterion);
          break;

        case INBOX_JAMES_DELETED_MESSAGES.CRITERIA.ATTACHMENT:
          summary = _getAttachmentCriterionSummary(criterion);
          break;

        default:
          summary = '';
      }

      return summary;
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

    function _getAttachmentCriterionSummary(criterion) {
      var summary = 'Messages have attachment';

      if (!criterion.value) {
        summary = 'Messages do not have attachment';
      }

      return esnI18nService.translate(summary).toString();
    }
  }
})(angular);
