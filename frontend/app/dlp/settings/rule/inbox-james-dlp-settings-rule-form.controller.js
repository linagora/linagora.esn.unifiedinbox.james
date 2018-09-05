(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .controller('InboxJamesDlpSettingsRuleFormController', InboxJamesDlpSettingsRuleFormController);

  function InboxJamesDlpSettingsRuleFormController() {
    var self = this;

    self.isSampleDataMatchExpression = isSampleDataMatchExpression;
    self.onDeleteBtnClick = onDeleteBtnClick;
    self.onUndoBtnClick = onUndoBtnClick;
    self.onTestExpressionBtnClick = onTestExpressionBtnClick;
    self.validateExpression = validateExpression;

    function isSampleDataMatchExpression(form) {
      if (!self.sampleData) {
        return false;
      }

      return new RegExp(self.rule.expression).test(self.sampleData);
    }

    function onDeleteBtnClick(form) {
      self.rule.deleted = true;
      form.$setDirty();
    }

    function onUndoBtnClick() {
      self.rule.deleted = false;
    }

    function onTestExpressionBtnClick() {
      self.showTestExpressionField = true;
    }

    function validateExpression(expression) {
      if (!expression) {
        return false;
      }

      try {
        new RegExp(expression);

        return true;
      } catch (error) {
        return false;
      }
    }
  }
})(angular);
