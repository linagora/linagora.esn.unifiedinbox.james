(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .factory('inboxJamesDlp', inboxJamesDlp);

  function inboxJamesDlp(
    session
  ) {
    return {
      getQuarantineMailRepositoryPath: getQuarantineMailRepositoryPath
    };

    function getQuarantineMailRepositoryPath() {
      return ['var/mail/dlp/quarantine', session.domain.name].join('/');
    }
  }
})(angular);
