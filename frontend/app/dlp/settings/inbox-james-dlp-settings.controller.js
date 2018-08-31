(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('inboxJamesDlpSettingsController', inboxJamesDlpSettingsController);

  function inboxJamesDlpSettingsController(
    uuid4,
    session,
    asyncAction,
    jamesWebadminClient
  ) {
    var self = this;
    var notificationMessages = {
      progressing: 'Storing rules...',
      success: 'Rules stored',
      failure: 'Failed to store rules'
    };
    var DOMAIN_NAME = session.domain.name;

    self.$onInit = $onInit;
    self.addForm = addForm;
    self.onDeleteBtnClick = onDeleteBtnClick;
    self.onFormSubmit = onFormSubmit;

    function $onInit() {
      self.status = 'loading';

      jamesWebadminClient.listDlpRules(DOMAIN_NAME)
        .then(function(rules) {
          self.rules = rules;
          self.status = 'loaded';
        })
        .catch(function() {
          self.status = 'error';
        });
    }

    function addForm() {
      self.rules.unshift({
        id: uuid4.generate()
      });
    }

    function onDeleteBtnClick(form, ruleId) {
      self.rules = self.rules.filter(function(rule) {
        return rule.id !== ruleId;
      });
      form.$setDirty();
    }

    function onFormSubmit() {
      return asyncAction(notificationMessages, function() {
        return jamesWebadminClient.storeDlpRules(DOMAIN_NAME, self.rules);
      });
    }
  }
})(angular);
