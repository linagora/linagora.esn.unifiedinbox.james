(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesMailRepositoryController', inboxJamesMailRepositoryController);

  function inboxJamesMailRepositoryController(
    infiniteScrollHelper,
    inboxJamesMailRepository,
    inboxJamesMailRepositoryEmailSelection
  ) {
    var self = this;
    var options = {
      offset: 0,
      limit: 20
    };

    self.$onInit = $onInit;
    self.$onDestroy = $onDestroy;
    self.download = download;

    function $onInit() {
      self.loadMoreElements = infiniteScrollHelper(self, _loadNextItems);
    }

    function $onDestroy() {
      inboxJamesMailRepositoryEmailSelection.unSelectAll();
    }

    function download(email) {
      inboxJamesMailRepository.downloadEmlFile(self.path, email.name);
    }

    function _loadNextItems() {
      options.offset = self.elements.length;

      return inboxJamesMailRepository.list(self.path, options);
    }
  }
})(angular);
