'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The InboxJamesDeletedMessagesRestoreController controller', function() {
  var $controller, $rootScope;
  var inboxJamesDeletedMessagesService;
  var INBOX_JAMES_DELETED_MESSAGES;
  var sessionMock;

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.james');

    sessionMock = {
      ready: $q.when()
    };

    module(function($provide) {
      $provide.value('session', sessionMock);
    });

    inject(function(
      _$controller_,
      _$rootScope_,
      _inboxJamesDeletedMessagesService_,
      _INBOX_JAMES_DELETED_MESSAGES_
    ) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      inboxJamesDeletedMessagesService = _inboxJamesDeletedMessagesService_;
      INBOX_JAMES_DELETED_MESSAGES = _INBOX_JAMES_DELETED_MESSAGES_;
    });
  });

  function initController($scope) {
    $scope = $scope || $rootScope.$new();

    var controller = $controller('InboxJamesDeletedMessagesRestoreController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit method', function() {
    it('should init an empty array of criteria', function() {
      var controller = initController();

      expect(controller.criteria).to.deep.equal([]);
    });
  });

  describe('The onCancelBtnClick method', function() {
    it('should reset array of criteria', function() {
      var controller = initController();

      controller.criteria = [{ foo: 'bar' }];

      controller.onCancelBtnClick();

      expect(controller.criteria).to.deep.equal([]);
    });
  });

  describe('The onRecoverBtnClick method', function() {
    it('should reject if failed to submit restoring request', function(done) {
      sessionMock.user = { _id: '123' };

      var controller = initController();

      inboxJamesDeletedMessagesService.submitRestoringRequest = sinon.stub().returns($q.reject());

      controller.onRecoverBtnClick()
        .then(function() {
          done('should not resolve');
        })
        .catch(function() {
          expect(inboxJamesDeletedMessagesService.submitRestoringRequest).to.have.been.calledWith(sessionMock.user._id, {
            combinator: INBOX_JAMES_DELETED_MESSAGES.COMBINATOR,
            criteria: []
          });
          done();
        });

      $rootScope.$digest();
    });

    it('should resolve if success to submit restoring request', function(done) {
      sessionMock.user = { _id: '123' };
      var criterion = {
        fieldName: 'foo',
        operator: 'bar',
        label: 'foo',
        value: 'baz'
      };

      var controller = initController();

      controller.criteria = [criterion];

      inboxJamesDeletedMessagesService.submitRestoringRequest = sinon.stub().returns($q.when());

      controller.onRecoverBtnClick()
        .then(function() {
          expect(inboxJamesDeletedMessagesService.submitRestoringRequest).to.have.been.calledWith(sessionMock.user._id, {
            combinator: INBOX_JAMES_DELETED_MESSAGES.COMBINATOR,
            criteria: [{
              fieldName: criterion.fieldName,
              operator: criterion.operator,
              value: criterion.value
            }]
          });
          expect(controller.criteria).to.deep.equal([]);
          done();
        })
        .catch(function() {
          done('should resolve');
        });

      $rootScope.$digest();
    });
  });
});
