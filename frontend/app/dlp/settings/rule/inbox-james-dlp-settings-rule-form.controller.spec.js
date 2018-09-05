'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The InboxJamesDlpSettingsRuleFormController', function() {
  var $rootScope, $controller;

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.james');

    inject(function(
      _$rootScope_,
      _$controller_
    ) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
    });
  });

  function initController($scope, rule) {
    $scope = $scope || $rootScope.$new();

    var controller = $controller('InboxJamesDlpSettingsRuleFormController', { $scope: $scope }, { rule: rule || {} });

    $scope.$digest();

    return controller;
  }

  describe('The isSampleDataMatchExpression function', function() {
    it('should return false if there is no sample data', function() {
      var controller = initController();

      controller.rule.expression = '123';

      expect(controller.isSampleDataMatchExpression()).to.be.false;
    });

    it('should return false if sample data does not match expression', function() {
      var controller = initController();

      controller.sampleData = 'not-match';
      controller.rule.expression = '123';

      expect(controller.isSampleDataMatchExpression()).to.be.false;
    });

    it('should return true if sample data matches expression', function() {
      var controller = initController();

      controller.sampleData = 'match expression';
      controller.rule.expression = 'match';

      expect(controller.isSampleDataMatchExpression()).to.be.true;
    });
  });

  describe('The onDeleteBtnClick function', function() {
    it('should set #rule.deleted to true', function() {
      var form = {
        $setDirty: sinon.spy()
      };
      var controller = initController();

      controller.onDeleteBtnClick(form);

      expect(controller.rule.deleted).to.be.true;
      expect(form.$setDirty).to.have.been.calledOnce;
    });
  });

  describe('The onUndoBtnClick function', function() {
    it('should set #rule.deleted to false', function() {
      var controller = initController();

      controller.onUndoBtnClick();

      expect(controller.rule.deleted).to.be.false;
    });
  });

  describe('The onTestExpressionBtnClick function', function() {
    it('should set showTestExpressionField to true', function() {
      var controller = initController();

      controller.onTestExpressionBtnClick();

      expect(controller.showTestExpressionField).to.be.true;
    });
  });

  describe('The validateExpression function', function() {
    it('should return false if there is no expression', function() {
      var controller = initController();

      expect(controller.validateExpression()).to.be.false;
    });

    it('should return false if there is an invalid expression', function() {
      var controller = initController();

      expect(controller.validateExpression('\\')).to.be.false;
    });

    it('should return true if there is a valid expression', function() {
      var controller = initController();

      expect(controller.validateExpression('valid')).to.be.true;
    });
  });
});
