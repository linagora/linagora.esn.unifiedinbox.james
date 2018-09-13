(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesMailRepositoryHeaderController', inboxJamesMailRepositoryHeaderController);

  function inboxJamesMailRepositoryHeaderController(
    $scope,
    inboxJamesMailRepository,
    inboxJamesMailRepositoryEmailSelection,
    INBOX_JAMES_MAIL_REPOSITORY_MAIL_DELETION_TARGET
  ) {
    var self = this;

    self.onSelectAllCheckboxClick = onSelectAllCheckboxClick;
    self.getNumberOfSelectedEmails = getNumberOfSelectedEmails;
    self.isSelecting = isSelecting;
    self.onDeleteBtnClick = onDeleteBtnClick;
    self.onBulkActionChange = onBulkActionChange;
    self.$onInit = $onInit;

    function $onInit() {
      $scope.$watch(function() {
        return self.emails.length === inboxJamesMailRepositoryEmailSelection.getSelected().length;
      }, function(selectedAllEmails) {
        if (!selectedAllEmails && self.selectedAllEmails && self.bulkAction) {
          self.bulkAction = false;
        }

        self.selectedAllEmails = !!selectedAllEmails;
      });
    }

    function onSelectAllCheckboxClick() {
      self.bulkAction = false;

      _toggleSelectAll(self.selectedAllEmails);
    }

    function onBulkActionChange() {
      self.selectedAllEmails = self.bulkAction;

      _toggleSelectAll(self.bulkAction);
    }

    function getNumberOfSelectedEmails() {
      return inboxJamesMailRepositoryEmailSelection.getSelected().length;
    }

    function isSelecting() {
      return inboxJamesMailRepositoryEmailSelection.isSelecting();
    }

    function onDeleteBtnClick() {
      var context = {
        target: INBOX_JAMES_MAIL_REPOSITORY_MAIL_DELETION_TARGET.MULTIPLE,
        data: inboxJamesMailRepositoryEmailSelection.getSelected()
      };

      if (self.bulkAction) {
        context = {
          target: INBOX_JAMES_MAIL_REPOSITORY_MAIL_DELETION_TARGET.ALL,
          data: self.repository
        };
      }

      inboxJamesMailRepository.openMailsDeletingModal(context);
    }

    function _toggleSelectAll(isSelectAll) {
      if (!isSelectAll) {
        inboxJamesMailRepositoryEmailSelection.unSelectAll();
      } else {
        self.emails.forEach(function(email) {
          inboxJamesMailRepositoryEmailSelection.toggleSelection(email, true);
        });
      }
    }
  }
})(angular);
