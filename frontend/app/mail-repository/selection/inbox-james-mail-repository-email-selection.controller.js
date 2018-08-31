(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesMailRepositoryEmailSelectionController', inboxJamesMailRepositoryEmailSelectionController);

  function inboxJamesMailRepositoryEmailSelectionController(inboxJamesMailRepositoryEmailSelection) {
    var self = this;

    self.select = select;

    function select() {
      inboxJamesMailRepositoryEmailSelection.toggleSelection(self.email);
    }
  }
})(angular);
