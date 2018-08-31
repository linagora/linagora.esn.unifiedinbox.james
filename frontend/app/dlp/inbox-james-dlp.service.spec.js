'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The inboxJamesDlp service', function() {
  var session, inboxJamesDlp;

  beforeEach(module('linagora.esn.unifiedinbox.james'));

  beforeEach(inject(function(_inboxJamesDlp_, _session_) {
    inboxJamesDlp = _inboxJamesDlp_;
    session = _session_;
  }));

  describe('The getQuarantineMailRepositoryPath function', function() {
    it('should return the mail repository path based on current domain', function() {
      session.domain = {
        name: 'toto.ln'
      };

      var path = inboxJamesDlp.getQuarantineMailRepositoryPath();

      expect(path).to.equal('var/mail/dlp/quarantine/toto.ln');
    });
  });
});
