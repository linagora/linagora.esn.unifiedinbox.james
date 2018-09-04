'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The inboxJamesDlpSettingsController', function() {
  var $rootScope, $controller;
  var session, jamesWebadminClient;
  var uuid4Mock;
  var DOMAIN_NAME = 'lng.org';

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.james');

    uuid4Mock = {
      _uuid: '123',
      generate: function() {
        return this._uuid;
      }
    };

    module(function($provide) {
      $provide.value('uuid4', uuid4Mock);
    });

    inject(function(
      _$rootScope_,
      _$controller_,
      _session_,
      _jamesWebadminClient_
    ) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      session = _session_;
      jamesWebadminClient = _jamesWebadminClient_;
    });

    session.domain = {
      name: DOMAIN_NAME
    };
  });

  function initController($scope) {
    $scope = $scope || $rootScope.$new();

    var controller = $controller('inboxJamesDlpSettingsController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should call #jamesWebadminClient.listDlpRules to list rules', function() {
      var rules = [{
        id: '1',
        expression: 'abc',
        explanation: 'Anything contains abcs',
        targetsSender: false,
        targetsRecipients: false,
        targetsContent: true
      }];

      jamesWebadminClient.listDlpRules = sinon.stub().returns($q.when(rules));

      var controller = initController();

      expect(controller.rules).to.deep.equal(rules);
      expect(jamesWebadminClient.listDlpRules).to.have.been.calledWith(DOMAIN_NAME);
    });
  });

  describe('The addForm function', function() {
    it('should append a new rule at the top of list rules', function() {
      jamesWebadminClient.listDlpRules = function() {
        return $q.when([]);
      };

      var controller = initController();

      controller.addForm();

      expect(controller.rules).to.deep.equal([{
        id: uuid4Mock._uuid
      }]);
    });
  });

  describe('The onFormSubmit function', function() {
    it('should call #jamesWebadminClient.storeDlpRules to store the qualified rules', function() {
      jamesWebadminClient.listDlpRules = function() {
        return $q.when([]);
      };
      jamesWebadminClient.storeDlpRules = sinon.stub().returns($q.when());
      var rules = [{
        id: '1',
        expression: 'rule1',
        explanation: 'Anything contains rule1',
        targetsSender: false,
        targetsRecipients: false,
        targetsContent: true
      }, {
        id: '2',
        expression: 'rule2',
        explanation: 'Anything contains rule2',
        targetsSender: false,
        targetsRecipients: false,
        targetsContent: true,
        deleted: true
      }, {
        id: '3',
        expression: 'rule3',
        explanation: 'Anything contains rule3',
        targetsSender: false,
        targetsRecipients: false,
        targetsContent: true
      }];
      var expectedRules = [rules[0], rules[2]];
      var controller = initController();

      controller.rules = rules;

      controller.onFormSubmit();
      $rootScope.$digest();

      expect(jamesWebadminClient.storeDlpRules).to.have.been.calledWith(DOMAIN_NAME, expectedRules);
      expect(controller.rules).to.deep.equal(expectedRules);
    });
  });
});
