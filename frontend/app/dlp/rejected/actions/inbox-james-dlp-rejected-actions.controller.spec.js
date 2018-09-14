'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The inboxJamesDlpRejectedActionsController', function() {
  var $rootScope, $controller;
  var jamesWebadminClient, inboxJamesDlpService, inboxJamesMailRepositoryEmailSelection;
  var INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS, INBOX_JAMES_MAIL_REPOSITORY_EVENTS;
  var REPOSITORY_PATH = '/repository/path';

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.james');

    inject(function(
      _$rootScope_,
      _$controller_,
      _jamesWebadminClient_,
      _inboxJamesDlpService_,
      _inboxJamesMailRepositoryEmailSelection_,
      _INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS_,
      _INBOX_JAMES_MAIL_REPOSITORY_EVENTS_
    ) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      jamesWebadminClient = _jamesWebadminClient_;
      inboxJamesDlpService = _inboxJamesDlpService_;
      inboxJamesMailRepositoryEmailSelection = _inboxJamesMailRepositoryEmailSelection_;
      INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS = _INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS_;
      INBOX_JAMES_MAIL_REPOSITORY_EVENTS = _INBOX_JAMES_MAIL_REPOSITORY_EVENTS_;
    });

    inboxJamesDlpService.getMailRepositoryPath = function() {
      return REPOSITORY_PATH;
    };
  });

  function initController(options) {
    options = options || {};
    var $scope = $rootScope.$new();
    var controller = $controller(
      'inboxJamesDlpRejectedActionsController',
      { $scope: $scope },
      {
        email: options.email,
        onClick: options.onClick
      }
    );

    $scope.$digest();

    return controller;
  }

  describe('The onQuarantineBtnClick function', function() {
    describe('Single email', function() {
      it('should call onClick function', function(done) {
        var onClickMock = sinon.spy();
        var controller = initController({
          onClick: onClickMock,
          email: {}
        });

        jamesWebadminClient.reprocessMailFromMailRepository = function() {
          return $q.when();
        };

        controller.onQuarantineBtnClick()
          .then(function() {
            expect(onClickMock).to.have.been.calledOnce;
            done();
          });

        $rootScope.$digest();
      });

      it('should reject if failed to quarantine quarantined email', function(done) {
        var email = { name: '1234567' };
        var controller = initController({
          onClick: function() {},
          email: email
        });

        jamesWebadminClient.reprocessMailFromMailRepository = sinon.stub().returns($q.reject());

        controller.onQuarantineBtnClick()
          .catch(function() {
            expect(jamesWebadminClient.reprocessMailFromMailRepository).to.have.been.calledWith(
              REPOSITORY_PATH,
              email.name,
              { processor: INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.QUARANTINE }
            );
            done();
          });

        $rootScope.$digest();
      });

      it('should resolve if success to quarantine quarantined email', function(done) {
        var email = { name: '1234567' };
        var controller = initController({
          onClick: function() {},
          email: email
        });

        jamesWebadminClient.reprocessMailFromMailRepository = sinon.stub().returns($q.when());
        $rootScope.$broadcast = sinon.spy();

        controller.onQuarantineBtnClick()
          .then(function() {
            expect(jamesWebadminClient.reprocessMailFromMailRepository).to.have.been.calledWith(
              REPOSITORY_PATH,
              email.name,
              { processor: INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.QUARANTINE }
            );
            expect($rootScope.$broadcast).to.have.been.calledWith(
              INBOX_JAMES_MAIL_REPOSITORY_EVENTS.MAILS_REMOVED,
              { emails: [email] }
            );
            done();
          });

        $rootScope.$digest();
      });
    });

    describe('Multiple emails', function() {
      it('should reject if failed to quarantine quarantined emails', function(done) {
        var email = { name: 'mailKey' };
        var controller = initController();

        jamesWebadminClient.reprocessMailFromMailRepository = sinon.stub().returns($q.reject());
        inboxJamesMailRepositoryEmailSelection.getSelected = sinon.stub().returns([email]);

        controller.onQuarantineBtnClick()
          .catch(function() {
            expect(jamesWebadminClient.reprocessMailFromMailRepository).to.have.been.calledWith(
              REPOSITORY_PATH,
              email.name,
              { processor: INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.QUARANTINE }
            );
            done();
          });

        $rootScope.$digest();
      });

      it('should resolve if success to quarantine quarantined emails', function(done) {
        var emails = [
          { name: 'mailKey1' },
          { name: 'mailKey2' }
        ];
        var controller = initController();

        jamesWebadminClient.reprocessMailFromMailRepository = sinon.stub().returns($q.when());
        inboxJamesMailRepositoryEmailSelection.getSelected = sinon.stub().returns(emails);
        $rootScope.$broadcast = sinon.spy();

        controller.onQuarantineBtnClick()
          .then(function() {
            expect(inboxJamesMailRepositoryEmailSelection.getSelected).to.have.been.calledOnce;
            expect(jamesWebadminClient.reprocessMailFromMailRepository).to.have.been.calledTwice;
            expect(jamesWebadminClient.reprocessMailFromMailRepository).to.have.been.calledWith(
              REPOSITORY_PATH,
              emails[0].name,
              { processor: INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.QUARANTINE }
            );
            expect(jamesWebadminClient.reprocessMailFromMailRepository).to.have.been.calledWith(
              REPOSITORY_PATH,
              emails[1].name,
              { processor: INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.QUARANTINE }
            );
            expect($rootScope.$broadcast).to.have.been.calledWith(
              INBOX_JAMES_MAIL_REPOSITORY_EVENTS.MAILS_REMOVED,
              { emails: emails }
            );
            done();
          });

        $rootScope.$digest();
      });
    });

    describe('All emails', function() {
      it('should reject if failed to quarantine all quarantined emails', function(done) {
        var controller = initController();

        jamesWebadminClient.reprocessAllMailsFromMailRepository = sinon.stub().returns($q.reject());

        controller.bulkAction = true;
        controller.onQuarantineBtnClick()
          .catch(function() {
            expect(jamesWebadminClient.reprocessAllMailsFromMailRepository).to.have.been.calledWith(
              REPOSITORY_PATH,
              { processor: INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.QUARANTINE }
            );
            done();
          });

        $rootScope.$digest();
      });

      it('should resolve if success to quarantine all quarantined emails', function(done) {
        var controller = initController();

        jamesWebadminClient.reprocessAllMailsFromMailRepository = sinon.stub().returns($q.when());
        $rootScope.$broadcast = sinon.spy();

        controller.bulkAction = true;
        controller.onQuarantineBtnClick()
          .then(function() {
            expect(jamesWebadminClient.reprocessAllMailsFromMailRepository).to.have.been.calledWith(
              REPOSITORY_PATH,
              { processor: INBOX_JAMES_MAIL_REPOSITORY_PROCESSORS.QUARANTINE }
            );
            expect($rootScope.$broadcast).to.have.been.calledWith(INBOX_JAMES_MAIL_REPOSITORY_EVENTS.ALL_MAILS_REMOVED);
            done();
          });

        $rootScope.$digest();
      });
    });
  });
});
