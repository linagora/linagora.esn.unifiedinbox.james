(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .run(injectQuarantineRuleDisplayer);

  function injectQuarantineRuleDisplayer(dynamicDirectiveService) {
    var ruleDisplayer = new dynamicDirectiveService.DynamicDirective(true, 'inbox-james-dlp-rule-displayer', {
      attributes: [
        { name: 'email', value: '::$ctrl.email' }
      ]
    });

    dynamicDirectiveService.addInjection('mail-repository-mail-extra-info', ruleDisplayer);
  }
})(angular);
