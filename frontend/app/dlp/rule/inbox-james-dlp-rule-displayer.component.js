(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .component('inboxJamesDlpRuleDisplayer', {
    templateUrl: '/linagora.esn.unifiedinbox.james/app/dlp/rule/inbox-james-dlp-rule-displayer.html',
    controller: 'inboxJamesDlpRuleDisplayerController',
    bindings: {
      email: '<'
    }
  });
})(angular);
