'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The inboxJamesDlpRuleDisplayerController', function() {
  var $rootScope, $controller;
  var session, jamesWebadminClient, inboxJamesDlpService;
  var INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES;
  var DOMAIN_NAME = 'lng.org';

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.james');

    inject(function(
      _$rootScope_,
      _$controller_,
      _session_,
      _jamesWebadminClient_,
      _inboxJamesDlpService_,
      _INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES_
    ) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      session = _session_;
      jamesWebadminClient = _jamesWebadminClient_;
      inboxJamesDlpService = _inboxJamesDlpService_;
      INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES = _INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES_;
    });

    session.domain = {
      name: DOMAIN_NAME
    };
  });

  function initController(email) {
    var $scope = $rootScope.$new();

    var controller = $controller('inboxJamesDlpRuleDisplayerController', { $scope: $scope });

    controller.email = email;
    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should not display rule details if mail is not from quarantine or rejected repository', function() {
      var controller = initController({
        repository: '/invalid/repository',
        attributes: { DlpMatchedRule: '123' }
      });

      expect(controller.shouldDisplay).to.be.false;
    });

    it('should not display rule details if mail object does not contain dlp matched rule', function() {
      var controller = initController({
        repository: inboxJamesDlpService.getMailRepositoryPath(INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES.QUARANTINE),
        attributes: {}
      });

      expect(controller.shouldDisplay).to.be.false;
    });

    it('should get rule details for valid mail that contains matched rule and in correct repository', function() {
      jamesWebadminClient.getDlpRule = sinon.stub().returns($q.when({
        targetsSender: true,
        targetsContent: true,
        targetsRecipients: true
      }));

      var controller = initController({
        repository: inboxJamesDlpService.getMailRepositoryPath(INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES.QUARANTINE),
        attributes: { DlpMatchedRule: '123' }
      });

      expect(controller.shouldDisplay).to.be.true;
      expect(jamesWebadminClient.getDlpRule).to.have.been.called;
    });

    it('should display rule details with matching source based on the rule details', function() {
      jamesWebadminClient.getDlpRule = sinon.stub().returns($q.when({
        targetsSender: true,
        targetsContent: true,
        targetsRecipients: false
      }));

      var controller = initController({
        repository: inboxJamesDlpService.getMailRepositoryPath(INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES.QUARANTINE),
        attributes: { DlpMatchedRule: '123' }
      });

      expect(controller.shouldDisplay).to.be.true;
      expect(jamesWebadminClient.getDlpRule).to.have.been.called;
      expect(controller.rule.source).to.equal('message content, sender');
    });
  });
});
