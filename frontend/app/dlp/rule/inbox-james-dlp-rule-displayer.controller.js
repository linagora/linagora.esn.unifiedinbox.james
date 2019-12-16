(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesDlpRuleDisplayerController', inboxJamesDlpRuleDisplayerController);

  function inboxJamesDlpRuleDisplayerController(
    session,
    esnI18nService,
    jamesApiClient,
    inboxJamesDlpService,
    INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES
  ) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      var repositoriesToDisplay = [
        inboxJamesDlpService.getMailRepositoryPath(INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES.QUARANTINE),
        inboxJamesDlpService.getMailRepositoryPath(INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES.REJECTED)
      ];

      self.shouldDisplay = self.email.attributes &&
        !!self.email.attributes.DlpMatchedRule &&
        repositoriesToDisplay.indexOf(self.email.repository) !== -1;

      self.shouldDisplay && jamesApiClient.getDlpRule(
        session.domain._id,
        self.email.attributes.DlpMatchedRule
      ).then(function(rule) {
        self.rule = _processRule(rule);
      })
      .catch(function() {
        self.ruleNotFound = true;
      });
    }

    function _processRule(rule) {
      var source = [];

      rule.targetsContent && source.push(esnI18nService.translate('message content').toString());
      rule.targetsSender && source.push(esnI18nService.translate('sender').toString());
      rule.targetsRecipients && source.push(esnI18nService.translate('recipients').toString());

      rule.source = source.join(', ');

      return rule;
    }
  }
})(angular);
