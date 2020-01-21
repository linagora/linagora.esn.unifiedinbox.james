const chai = require('chai');
const expect = chai.expect;

describe('The UnifiedInboxRestoringDeletedMessagesRequests model', function() {
  let UnifiedInboxRestoringDeletedMessagesRequests, ObjectId, mongoose;
  let RESTORING_MESSAGES_REQUEST;

  beforeEach(function(done) {
    mongoose = this.moduleHelpers.dependencies('db').mongo.mongoose;

    ObjectId = mongoose.Types.ObjectId;

    RESTORING_MESSAGES_REQUEST = require(`${this.testEnv.backendPath}/lib/constants`).RESTORING_MESSAGES_REQUEST;
    UnifiedInboxRestoringDeletedMessagesRequests = mongoose.model('UnifiedInboxRestoringDeletedMessagesRequests');

    this.connectMongoose(mongoose, done);
  });

  afterEach(function(done) {
    delete mongoose.connection.models.UnifiedInboxRestoringDeletedMessagesRequests;
    this.helpers.mongo.dropDatabase(err => {
      if (err) return done(err);
      this.testEnv.core.db.mongo.mongoose.connection.close(done);
    });
  });

  function saveRestoringMessagesRequest(restoringMessagesRequestJson, callback) {
    const restoringMessagesRequest = new UnifiedInboxRestoringDeletedMessagesRequests(restoringMessagesRequestJson);

    return restoringMessagesRequest.save(callback);
  }

  describe('The #content.cominator field', function() {
    it('should not store the request which has invalid combinator', function(done) {
      const restoringMessagesRequestJson = {
        title: 'test',
        targetUser: new ObjectId(),
        issuer: new ObjectId(),
        content: {
          combinator: 'invalid'
        }
      };

      saveRestoringMessagesRequest(restoringMessagesRequestJson, err => {
        expect(err).to.exist;
        expect(err.errors['content.combinator'].message).to.equal('Invalid restoring messages request combinator');
        done();
      });
    });

    it('should store the request which has valid combinator', function(done) {
      const restoringMessagesRequestJson = {
        title: 'test',
        targetUser: new ObjectId(),
        issuer: new ObjectId(),
        content: {
          combinator: RESTORING_MESSAGES_REQUEST.COMBINATORS.AND
        }
      };

      saveRestoringMessagesRequest(restoringMessagesRequestJson, (err, savedRequest) => {
        expect(err).to.not.exist;
        expect(savedRequest.content.combinator).to.equal(RESTORING_MESSAGES_REQUEST.COMBINATORS.AND);
        done();
      });
    });
  });

  describe('The #status field', function() {
    it('should not store the request which has invalid status', function(done) {
      const restoringMessagesRequestJson = {
        title: 'test',
        targetUser: new ObjectId(),
        issuer: new ObjectId(),
        status: 'invalid'
      };

      saveRestoringMessagesRequest(restoringMessagesRequestJson, err => {
        expect(err).to.exist;
        expect(err.errors.status.message).to.equal('Invalid restoring messages request status');
        done();
      });
    });

    it('should store the request which has valid status', function(done) {
      const restoringMessagesRequestJson = {
        title: 'test',
        targetUser: new ObjectId(),
        issuer: new ObjectId(),
        status: RESTORING_MESSAGES_REQUEST.STATUSES.PENDING
      };

      saveRestoringMessagesRequest(restoringMessagesRequestJson, (err, savedRequest) => {
        expect(err).to.not.exist;
        expect(savedRequest.status).to.equal(RESTORING_MESSAGES_REQUEST.STATUSES.PENDING);
        done();
      });
    });
  });
});
