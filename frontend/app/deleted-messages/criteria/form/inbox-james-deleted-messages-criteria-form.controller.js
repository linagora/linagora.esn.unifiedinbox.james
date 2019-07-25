(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('InboxJamesDeletedMessagesCriteriaFormController', InboxJamesDeletedMessagesCriteriaFormController);

  function InboxJamesDeletedMessagesCriteriaFormController(_, $timeout, $element, elementScrollService, INBOX_JAMES_DELETED_MESSAGES) {
    var self = this;

    self.$onInit = $onInit;
    self.addCriterion = addCriterion;
    self.deleteCriterion = deleteCriterion;
    self.onSelectAllToggleChange = onSelectAllToggleChange;

    function $onInit() {
      self.selectAll = !self.criteria.length;
      self.displayedCriteria = self.criteria || [];
    }

    function onSelectAllToggleChange() {
      if (self.selectAll) {
        self.criteria = [];
      } else {
        self.criteria = self.displayedCriteria;
      }
    }

    function addCriterion() {
      self.displayedCriteria.push(INBOX_JAMES_DELETED_MESSAGES.CRITERIA.DEFAULT_CRITERION);
      self.criteria = self.displayedCriteria;

      $timeout(function() {
        elementScrollService.scrollDownToElement($(_.last($element.find('inbox-james-deleted-messages-criteria-item'))));
      }, 0);
    }

    function deleteCriterion(index) {
      self.displayedCriteria.splice(index, 1);
      self.criteria = self.displayedCriteria;
    }
  }
})(angular);
