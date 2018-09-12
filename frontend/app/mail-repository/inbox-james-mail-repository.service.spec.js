'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The inboxJamesMailRepository service', function() {
  var $rootScope, $q;
  var inboxJamesMailRepository, InboxJamesMailRepositoryEmail, jamesWebadminClient;
  var userAPI, userUtils;
  var INBOX_MAIL_REPOSITORY_EMAIL_FIELDS, INBOX_MAIL_REPOSITORY_EVENTS;

  beforeEach(module('linagora.esn.unifiedinbox.james'));

  beforeEach(inject(function(
    _$rootScope_,
    _$q_,
    _inboxJamesMailRepository_,
    _InboxJamesMailRepositoryEmail_,
    _jamesWebadminClient_,
    _userAPI_,
    _userUtils_,
    _INBOX_MAIL_REPOSITORY_EMAIL_FIELDS_,
    _INBOX_MAIL_REPOSITORY_EVENTS_
  ) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    inboxJamesMailRepository = _inboxJamesMailRepository_;
    InboxJamesMailRepositoryEmail = _InboxJamesMailRepositoryEmail_;
    jamesWebadminClient = _jamesWebadminClient_;
    userAPI = _userAPI_;
    userUtils = _userUtils_;
    INBOX_MAIL_REPOSITORY_EMAIL_FIELDS = _INBOX_MAIL_REPOSITORY_EMAIL_FIELDS_;
    INBOX_MAIL_REPOSITORY_EVENTS = _INBOX_MAIL_REPOSITORY_EVENTS_;

    userAPI.getUsersByEmail = function() {
      return $q.when([{
        _id: 'user1'
      }]);
    };
    userUtils.displayNameOf = function() {
      return 'User 1';
    };
  }));

  describe('The list function', function() {
    it('should get the mailkeys from email repository then populate email sender details', function(done) {
      var emailKeys = ['email-key-1', 'email-key-2'];
      var mailSample = {
        sender: 'user1@op.co',
        recipients: []
      };

      jamesWebadminClient.listMailsInMailRepository = sinon.stub().returns($q.when(emailKeys));
      jamesWebadminClient.getMailInMailRepository = sinon.stub().returns($q.when(mailSample));

      inboxJamesMailRepository.list('mail/repository').then(function(results) {
        expect(jamesWebadminClient.listMailsInMailRepository).to.have.been.calledOnce;
        expect(jamesWebadminClient.listMailsInMailRepository).to.have.been.calledWith('mail/repository');
        expect(jamesWebadminClient.getMailInMailRepository).to.have.been.calledTwice;
        expect(jamesWebadminClient.getMailInMailRepository).to.have.been.calledWith('mail/repository', emailKeys[0], {
          additionalFields: INBOX_MAIL_REPOSITORY_EMAIL_FIELDS
        });
        expect(jamesWebadminClient.getMailInMailRepository).to.have.been.calledWith('mail/repository', emailKeys[1], {
          additionalFields: INBOX_MAIL_REPOSITORY_EMAIL_FIELDS
        });
        expect(results[0]).to.be.an.instanceof(InboxJamesMailRepositoryEmail);
        expect(results[1]).to.be.an.instanceof(InboxJamesMailRepositoryEmail);
        expect(results[0].repository).to.equal('mail/repository');
        expect(results[1].repository).to.equal('mail/repository');
        expect(results[0].sender.name).to.equal('User 1');
        expect(results[1].sender.name).to.equal('User 1');

        done();
      });

      $rootScope.$digest();
    });
  });

  describe('The downloadEmlFile function', function() {
    it('should call downloadEmlFileFromMailRepository with email repository', function() {
      jamesWebadminClient.downloadEmlFileFromMailRepository = sinon.spy();

      inboxJamesMailRepository.downloadEmlFile('mail/repository', 'email-key');

      expect(jamesWebadminClient.downloadEmlFileFromMailRepository).to.have.been.calledWith('mail/repository', 'email-key');
    });
  });

  describe('The deleteMails function', function() {
    it('should call jamesWebadminClient.deleteMailInMailRepository to delete emails', function() {
      jamesWebadminClient.deleteMailInMailRepository = sinon.stub().returns($q.when());

      var emails = [
        { name: 'mail1', repository: 'var/mail/test' },
        { name: 'mail2', repository: 'var/mail/test' }
      ];

      inboxJamesMailRepository.deleteMails(emails);

      $rootScope.$digest();
      expect(jamesWebadminClient.deleteMailInMailRepository).to.have.been.calledTwice;
      expect(jamesWebadminClient.deleteMailInMailRepository).to.have.been.calledWith(emails[0].repository, emails[0].name);
      expect(jamesWebadminClient.deleteMailInMailRepository).to.have.been.calledWith(emails[1].repository, emails[1].name);
     });

     it('should broadcast remove-mails event after deleted emails successfully', function() {
      jamesWebadminClient.deleteMailInMailRepository = function() { return $q.when(); };
      $rootScope.$broadcast = sinon.spy();

      var emails = [
       { name: 'mail1', repository: 'var/mail/test' },
       { name: 'mail2', repository: 'var/mail/test' }
      ];

      inboxJamesMailRepository.deleteMails(emails);

      $rootScope.$digest();

      expect($rootScope.$broadcast).to.have.been.calledWith(INBOX_MAIL_REPOSITORY_EVENTS.MAILS_REMOVED, { emails: emails });
     });
  });

  describe('The deleteAllMails function', function() {
    it('should call jamesWebadminClient.deleteAllMailsInMailRepository to delete all mails in mail repository', function() {
      jamesWebadminClient.deleteAllMailsInMailRepository = sinon.stub().returns($q.when());

      inboxJamesMailRepository.deleteAllMails('var/mail/test');

      $rootScope.$digest();
      expect(jamesWebadminClient.deleteAllMailsInMailRepository).to.have.been.calledWith('var/mail/test');
     });

     it('should broadcast remove-all-mails event after deleted all mails successfully', function() {
      jamesWebadminClient.deleteAllMailsInMailRepository = function() { return $q.when(); };
      $rootScope.$broadcast = sinon.spy();

      inboxJamesMailRepository.deleteAllMails('var/mail/test');

      $rootScope.$digest();

      expect($rootScope.$broadcast).to.have.been.calledWith(INBOX_MAIL_REPOSITORY_EVENTS.ALL_MAILS_REMOVED);
     });
  });
});
