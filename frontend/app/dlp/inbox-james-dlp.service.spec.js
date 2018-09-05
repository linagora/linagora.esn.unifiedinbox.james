'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The inboxJamesDlpService service', function() {
  var session, inboxJamesDlpService;

  beforeEach(module('linagora.esn.unifiedinbox.james'));

  beforeEach(inject(function(_inboxJamesDlpService_, _session_) {
    inboxJamesDlpService = _inboxJamesDlpService_;
    session = _session_;
  }));

  describe('The getQuarantineMailRepositoryPath function', function() {
    it('should return the mail repository path based on current domain', function() {
      var pathPrefix = 'prefix';

      session.domain = {
        name: 'toto.ln'
      };

      var path = inboxJamesDlpService.getMailRepositoryPath(pathPrefix);

      expect(path).to.equal(pathPrefix + '/' + session.domain.name);
    });
  });
});
