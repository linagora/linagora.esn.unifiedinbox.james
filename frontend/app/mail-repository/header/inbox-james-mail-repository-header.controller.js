(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesMailRepositoryHeaderController', inboxJamesMailRepositoryHeaderController);

  function inboxJamesMailRepositoryHeaderController($scope, inboxJamesMailRepositoryEmailSelection) {
    var self = this;

    self.toggleSelectAll = toggleSelectAll;
    self.getNumberOfSelectedEmails = getNumberOfSelectedEmails;
    self.isSelecting = isSelecting;
    self.$onInit = $onInit;

    function $onInit() {
      $scope.$watch(function() {
        return self.emails.length && self.emails.length === inboxJamesMailRepositoryEmailSelection.getSelected().length;
      }, function(selectedAllEmails) {
        self.selectedAllEmails = !!selectedAllEmails;
      });
    }

    function toggleSelectAll() {
      if (self.selectedAllEmails) {
        self.selectedAllEmails = false;
        inboxJamesMailRepositoryEmailSelection.unSelectAll();
      } else {
        self.selectedAllEmails = true;
        self.emails.forEach(function(email) {
          inboxJamesMailRepositoryEmailSelection.toggleSelection(email, true);
        });
      }
    }

    function getNumberOfSelectedEmails() {
      return inboxJamesMailRepositoryEmailSelection.getSelected().length;
    }

    function isSelecting() {
      return inboxJamesMailRepositoryEmailSelection.isSelecting();
    }
  }
})(angular);
