(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .factory('inboxJamesDlpService', inboxJamesDlpService);

  function inboxJamesDlpService(session) {
    return {
      getMailRepositoryPath: getMailRepositoryPath
    };

    function getMailRepositoryPath(pathPrefix) {
      return pathPrefix + '/' + session.domain.name;
    }
  }
})(angular);
