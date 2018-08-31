(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .component('inboxJamesDlpSettingsSubheader', {
    templateUrl: '/linagora.esn.unifiedinbox.james/app/dlp/settings/subheader/inbox-james-dlp-settings-subheader.html',
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
})(angular);
