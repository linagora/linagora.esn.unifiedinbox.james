const request = require('supertest');
const { expect } = require('chai');
const MODULE_NAME = 'linagora.esn.unifiedinbox.james';

describe('The create restoring deleted messages request: POST /restoringDeletedMessagesRequest', () => {
  let app, user;
  const password = 'secret';

  beforeEach(function(done) {
    this.helpers.modules.initMidway(MODULE_NAME, err => {
      expect(err).to.not.exist;
      const server = require(this.testEnv.backendPath + '/webserver/application')(this.helpers.modules.current.deps);
      const api = require(this.testEnv.backendPath + '/webserver/api')(this.helpers.modules.current.deps, this.helpers.modules.current.lib.lib);

      server.use(require('body-parser').json());
      server.use('/api', api);

      app = this.helpers.modules.getWebServer(server);
      this.helpers.api.applyDomainDeployment('linagora_IT', (err, models) => {
        if (err) {
          return done(err);
        }
        user = models.users[0];

        done();
      });
    });
  });

  afterEach(function(done) {
    this.helpers.mongo.dropDatabase(err => {
      if (err) return done(err);
      this.testEnv.core.db.mongo.mongoose.connection.close(done);
    });
  });

  it('should return 401 if not logged in', function(done) {
    this.helpers.api.requireLogin(app, 'post', '/api/restoringDeletedMessagesRequest', done);
  });

  it('should return 400 if no targetUser given in request body', function(done) {
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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

  it('should return 400 if criterion does not have "operator" property', function(done) {
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
    this.helpers.api.loginAsUser(app, user.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      const req = requestAsMember(request(app).post('/api/restoringDeletedMessagesRequest'));

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
