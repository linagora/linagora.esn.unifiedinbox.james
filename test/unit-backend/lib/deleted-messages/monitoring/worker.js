const { expect } = require('chai');
const sinon = require('sinon');
const mockery = require('mockery');

describe('The deleted messages monitoring worker module', () => {
  let james, user, getModule, emailSenderMock, sampleUser, constants;

  beforeEach(function() {
    const self = this;

    sampleUser = { id: 'sample' };

    james = {
      lib: {
        client: {
          getTask: sinon.stub()
        }
      }
    };

    user = {
      get: (id, callback) => callback(null, sampleUser)
    };

    emailSenderMock = {
      send: () => Promise.resolve()
    };

    constants = require(`${self.moduleHelpers.backendPath}/lib/constants`);

    constants.MONITOR_MESSAGES_RESTORING.CALL_INTERVAL = 100;

    mockery.registerMock('../../email-sender', () => emailSenderMock);
    mockery.registerMock('../../constants', constants);
    self.moduleHelpers.addDep('james', james);
    self.moduleHelpers.addDep('user', user);
    getModule = () => require(`${self.moduleHelpers.backendPath}/lib/deleted-messages/monitoring/worker`)(self.moduleHelpers.dependencies);
  });

  describe('The handle function', () => {
    it('should reject if failed to resolve target user', function(done) {
      user.get = (id, callback) => callback(new Error('something wrong'));

      getModule().handler.handle({ data: { taskId: 'task', targetUser: 'user' } })
        .then(
          () => done(new Error('should not resolve')),
          error => {
            expect(error.message).to.equal('something wrong');
            done();
          }
        )
        .catch(done);
    });

    it('should reject if no user found by target user id', function(done) {
      user.get = (id, callback) => callback();

      getModule().handler.handle({ data: { taskId: 'task', targetUser: 'user' } })
        .then(
          () => done(new Error('should not resolve')),
          error => {
            expect(error.message).to.match(/Unable to find target user with ID/);
            done();
          }
        )
        .catch(done);
    });

    it('should call #getTask multiple times and resolve when james task completed', function(done) {
      james.lib.client.getTask.onCall(0).returns(Promise.resolve());
      james.lib.client.getTask.onCall(1).returns(Promise.resolve());
      james.lib.client.getTask.onCall(2).returns(Promise.resolve({ status: 'completed' }));

      getModule().handler.handle({ data: { taskId: 'task'} })
        .then(() => {
          expect(james.lib.client.getTask).to.have.been.calledWith('task');
          expect(james.lib.client.getTask).to.have.been.calledThrice;

          done();
        })
        .catch(done);
    });

    it('should call #getTask multiple times and resolve when james task failed', function(done) {
      james.lib.client.getTask.onCall(0).returns(Promise.resolve());
      james.lib.client.getTask.onCall(1).returns(Promise.resolve({ status: 'failed' }));

      getModule().handler.handle({ data: { taskId: 'task'} })
        .then(() => {
          expect(james.lib.client.getTask).to.have.been.calledWith('task');
          expect(james.lib.client.getTask).to.have.been.calledTwice;

          done();
        })
        .catch(done);
    });

    it('should call #getTask multiple times and resolve when james task is cancelled', function(done) {
      james.lib.client.getTask.onCall(0).returns(Promise.resolve());
      james.lib.client.getTask.onCall(1).returns(Promise.resolve({ status: 'cancelled' }));

      getModule().handler.handle({ data: { taskId: 'task'} })
        .then(() => {
          expect(james.lib.client.getTask).to.have.been.calledWith('task');
          expect(james.lib.client.getTask).to.have.been.calledTwice;

          done();
        })
        .catch(done);
    });

    it('should reject when #getTask throws an error', function(done) {
      james.lib.client.getTask.returns(Promise.reject(new Error('failed to get task')));

      getModule().handler.handle({ data: { taskId: 'task'} })
        .then(() => done(new Error('should not resolve')))
        .catch(error => {
          expect(james.lib.client.getTask).to.have.been.calledWith('task');
          expect(james.lib.client.getTask).to.have.been.calledOnce;
          expect(error.message).to.equal('failed to get task');

          done();
        });
    });

    it('should reject in case of email sending failure', function(done) {
      emailSenderMock.send = sinon.stub().returns(Promise.reject(new Error('failed to send email')));
      james.lib.client.getTask.returns(Promise.resolve({ status: 'completed' }));

      getModule().handler.handle({ data: { taskId: 'task'} })
        .then(
          () => done(new Error('should not resolve')),
          error => {
            expect(error.message).to.equal('failed to send email');
            done();
          }
        )
        .catch(done);
    });

    it('should call #emailSender.send with additional information when gotten task details from James', function(done) {
      const task = {
        id: 'task',
        status: 'completed',
        additionalInformation: {
          numberOfRestoredEmails: 9000
        }
      };
      const { MAILBOX_NAME, REPORT_EMAIL_SUBJECT } = constants.MONITOR_MESSAGES_RESTORING;

      emailSenderMock.send = sinon.stub().returns(Promise.resolve());
      james.lib.client.getTask.returns(Promise.resolve(task));

      getModule().handler.handle({ data: { taskId: 'task'} })
        .then(() => {
          expect(james.lib.client.getTask).to.have.been.calledWith('task');
          expect(emailSenderMock.send).to.have.been.calledWithMatch(sinon.match({
            user: sampleUser,
            subject: REPORT_EMAIL_SUBJECT,
            emailTemplateName: 'deleted-messages.report',
            content: { numberOfRestoredEmails: 9000, mailboxName: MAILBOX_NAME}
          }));

          done();
        })
        .catch(done);
    });
  });
});
