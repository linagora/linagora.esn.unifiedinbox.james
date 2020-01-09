const request = require('supertest');
const { expect } = require('chai');

describe('The create restoring deleted messages request: POST /restoringDeletedMessagesRequest', () => {
  let app, helpers, user;
  const password = 'secret';

  beforeEach(function(done) {
    const self = this;

    helpers = this.helpers;
    app = self.helpers.modules.current.app;

    helpers.api.applyDomainDeployment('linagora_IT', (err, models) => {
      if (err) {
        return done(err);
      }
      user = models.users[0];

      done();
    });
  });

  it('should return 401 if not logged in', function(done) {
    helpers.api.requireLogin(app, 'post', '/unifiedinbox.james/api/restoringDeletedMessagesRequest', done);
  });

  it('should return 400 if no targetUser given in request body', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({});
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('targetUser is required in request body');

        done();
      });
    });
  });

  it('should return 400 if no content given in request body', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('content is required in request body');

        done();
      });
    });
  });

  it('should return 400 if no combinator given in request content', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: {}
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('should have required property \'combinator\'');

        done();
      });
    });
  });

  it('should return 400 if combinator given in request content is not supported', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: { combinator: 'not supported' }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('.combinator: should be equal to one of the allowed values');

        done();
      });
    });
  });

  it('should return 400 if no criteria given in request content', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: { combinator: 'and' }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('should have required property \'criteria\'');

        done();
      });
    });
  });

  it('should return 400 if criteria is not an array', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: { combinator: 'and', criteria: {} }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('.criteria: should be array');

        done();
      });
    });
  });

  it('should return 400 if criterion does not have "fieldName" property', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: {
          combinator: 'and',
          criteria: [{}]
        }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('.criteria[0]: should have required property \'fieldName\'');

        done();
      });
    });
  });

  it('should return 400 if criteria is an empty array', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: { combinator: 'and', criteria: [] }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('.criteria: should NOT have fewer than 1 items');

        done();
      });
    });
  });

  it('should return 400 if criterion does not have "operator" property', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: {
          combinator: 'and',
          criteria: [{
            fieldName: 'subject'
          }]
        }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('.criteria[0]: should have required property \'operator\'');

        done();
      });
    });
  });

  it('should return 400 if criterion does not have "value" property', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: {
          combinator: 'and',
          criteria: [{
            fieldName: 'subject',
            operator: 'operator'
          }]
        }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('.criteria[0]: should have required property \'value\'');

        done();
      });
    });
  });

  it('should return 400 if criterion fieldName is not supported', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: {
          combinator: 'and',
          criteria: [{
            fieldName: 'abc',
            operator: 'operator',
            value: 'value'
          }]
        }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('field name "abc" is not supported');

        done();
      });
    });
  });

  it('should return 400 if operator is not supported by fieldName', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: {
          combinator: 'and',
          criteria: [{
            fieldName: 'subject',
            operator: 'notSupportedOperator',
            value: 'value'
          }]
        }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('operator "notSupportedOperator" is not supported by "subject" field name');

        done();
      });
    });
  });

  it('should return 400 if value is not supported by fieldName', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: {
          combinator: 'and',
          criteria: [{
            fieldName: 'sender',
            operator: 'equals',
            value: 'not an email'
          }]
        }
      });
      req.expect(400);
      req.end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error.details).to.equal('sender value should be a valid email address');

        done();
      });
    });
  });

  it('should return 204 if criteria is well formed', function(done) {
    helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/unifiedinbox.james/api/restoringDeletedMessagesRequest'));

      req.send({
        targetUser: user._id,
        content: {
          combinator: 'and',
          criteria: [{
            fieldName: 'deliveryDate',
            operator: 'beforeOrEquals',
            value: '2008-09-15T15:53:00+05:00'
          }]
        },
        message: 'I want to recover my emails'
      });
      req.expect(204);
      req.end((err, res) => {
        expect(err).to.not.exist;

        done();
      });
    });
  });
});
