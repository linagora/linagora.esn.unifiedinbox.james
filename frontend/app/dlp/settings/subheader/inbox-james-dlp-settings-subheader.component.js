(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .component('inboxJamesDlpSettingsSubheader', {
    templateUrl: '/unifiedinbox.james/app/dlp/settings/subheader/inbox-james-dlp-settings-subheader.html',
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
})(angular);
