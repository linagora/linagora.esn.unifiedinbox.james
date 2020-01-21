const { expect } = require('chai');
const sinon = require('sinon');
const mockery = require('mockery');

describe('The email-sender module', () => {
  let emailModule, i8nModule, i18nConf, helpersModule, getModule, baseUrl, sendHTML;
  const sampleUser = {
    id: 'sample',
    preferredEmail: 'sample@examp.le'
  };

  beforeEach(function() {
    const self = this;

    baseUrl = 'http://localhost:8080';
    sendHTML = () => Promise.resolve();

    emailModule = {
      getMailer: () => ({ sendHTML })
    };

    i18nConf = {
      translate: text => text
    };

    i8nModule = {
      getI18nForMailer: () => Promise.resolve(i18nConf)
    };

    helpersModule = {
      config: {
        getBaseUrl: (user, callback) => callback(null, baseUrl)
      }
    };

    mockery.registerMock('../lib/i18n', () => i8nModule);
    self.moduleHelpers.addDep('email', emailModule);
    self.moduleHelpers.addDep('helpers', helpersModule);
    getModule = () => require(`${self.moduleHelpers.backendPath}/lib/email-sender`)(self.moduleHelpers.dependencies);
  });

  describe('The send function', () => {
    it('should reject if fail to get base url', function(done) {
      helpersModule.config.getBaseUrl = sinon.spy((user, callback) => callback(new Error('failed to get baseurl')));

      getModule().send({
        user: sampleUser,
        subject: 'One can not simply write subject first',
        emailTemplateName: 'template'
      }).then(
          () => done(new Error('should not resolve')),
          error => {
            expect(helpersModule.config.getBaseUrl).to.have.been.calledWith(sampleUser);
            expect(error.message).to.equal('failed to get baseurl');
            done();
          }
        )
        .catch(done);
    });

    it('should reject if fail to get i18n config for user', function(done) {
      i8nModule.getI18nForMailer = sinon.stub().returns(Promise.reject(new Error('failed to get i18n config for user')));

      getModule().send({
        user: sampleUser,
        subject: 'Subject is hard',
        emailTemplateName: 'template'
      }).then(
          () => done(new Error('should not resolve')),
          error => {
            expect(i8nModule.getI18nForMailer).to.have.been.calledWith(sampleUser);
            expect(error.message).to.equal('failed to get i18n config for user');
            done();
          }
        )
        .catch(done);
    });

    it('should reject when fail to send html mail', function(done) {
      sendHTML = sinon.stub().returns(Promise.reject(new Error('Failed to send html mail')));
      emailModule.getMailer = sinon.stub().returns({ sendHTML });

      getModule().send({
        user: sampleUser,
        subject: 'Subject is hard',
        emailTemplateName: 'template'
      }).then(
          () => done(new Error('should not resolve')),
          error => {
            expect(emailModule.getMailer).to.have.been.calledWith(sampleUser);
            expect(sendHTML).to.have.been.called;
            expect(error.message).to.equal('Failed to send html mail');
            done();
          }
        )
        .catch(done);
    });

    it('should resolve when successfully sending an email', function(done) {
      sendHTML = sinon.stub().returns(Promise.resolve());

      getModule().send({
        user: sampleUser,
        subject: 'Subject is hard',
        emailTemplateName: 'template'
      }).then(() => {
        expect(sendHTML).to.have.been.calledWithMatch(
          sinon.match({
            encoding: 'base64',
            subject: 'Subject is hard',
            to: sampleUser.preferredEmail
          }),
          sinon.match({
            name: 'template'
          }),
          sinon.match({
            content: { baseUrl: 'http://localhost:8080' },
            translate: sinon.match.func
          })
        );

        done();
      })
        .catch(done);
    });
  });
});
