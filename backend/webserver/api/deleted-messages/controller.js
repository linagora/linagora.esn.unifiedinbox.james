const { APPROVED } = require('../../../lib/constants').RESTORING_MESSAGES_REQUEST.STATUSES;

module.exports = function(dependencies, lib) {
  const logger = dependencies('logger');

  return {
    createRestoringRequest
  };

  function createRestoringRequest(req, res) {
    const { targetUser, content, message } = req.body;

    const restoringRequest = {
      targetUser,
      content,
      message,
      status: APPROVED //always be 'approved' for now
    };

    lib.deletedMessages.restoringRequests.create(restoringRequest)
      .then(() => res.status(204).end())
      .catch(err => {
        logger.error('Error while saving restoring request', err);
        res.status(500).json({
          error: {
            code: 500,
            message: 'Server Error',
            details: 'Error while submitting restoring request'
          }
        });
      });
    }
};
