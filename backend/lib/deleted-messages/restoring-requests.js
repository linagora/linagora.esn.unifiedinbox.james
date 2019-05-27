const { RESTORING_REQUEST_APPROVED } = require('../constants').EVENTS;

module.exports = dependencies => {
  const logger = dependencies('logger');
  const pubsub = dependencies('pubsub').local;
  const jamesModule = dependencies('james');
  const mongoose = dependencies('db').mongo.mongoose;
  const coreUser = dependencies('user');
  const RestoringRequest = mongoose.model('UnifiedInboxRestoringDeletedMessagesRequests');

  return {
    init,
    create
  };

  function init() {
    logger.info('Start listening on restoration event');
    pubsub.topic(RESTORING_REQUEST_APPROVED).subscribe(_onRestoringRequestApproved);
  }

  function create(request) {
    return RestoringRequest.create(request)
      .then(restoringRequest => {
        pubsub.topic(RESTORING_REQUEST_APPROVED).publish(restoringRequest); // Currently approve right after request is created
      });
  }

  function _onRestoringRequestApproved(request) {
    _getTargetEmailFromRestoringRequest(request)
      .then(email => {
        jamesModule.lib.client.restoreDeletedMessages(email, request.content)
          .then(data => logger.info(`Success to send restore request to James, Task Id: ${data.taskId}`))
          .catch(err => logger.error('Failed to send restore request to James', err));
      });
  }

  function _getTargetEmailFromRestoringRequest(request) {
    return new Promise((resolve, reject) => {
      coreUser.get(request.targetUser, (err, user) => {
        if (err) { return reject(err); }

        return resolve(user);
      });
    })
    .then(user => user.preferredEmail);
  }
};
