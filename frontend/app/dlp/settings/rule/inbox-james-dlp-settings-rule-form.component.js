(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .component('inboxJamesDlpSettingsRuleForm', {
    templateUrl: '/linagora.esn.unifiedinbox.james/app/dlp/settings/rule/inbox-james-dlp-settings-rule-form.html',
    controller: 'InboxJamesDlpSettingsRuleFormController',
    bindings: {
      rule: '='
    }
  });
})(angular);
