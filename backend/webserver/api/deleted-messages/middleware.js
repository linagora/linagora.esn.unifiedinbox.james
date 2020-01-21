module.exports = dependencies => {
  const { criteriaValidator } = require('../../../lib/deleted-messages')(dependencies);
  const { send400Error } = require('../utils')(dependencies);

  return {
    validateRestoringRequest
  };

  function validateRestoringRequest(req, res, next) {
    const { targetUser, content } = req.body;

    if (!targetUser) {
      return send400Error('targetUser is required in request body', res);
    }

    if (!content) {
      return send400Error('content is required in request body', res);
    }

    const invalidContentError = criteriaValidator(req.body.content);

    if (invalidContentError) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Bad Request',
          details: invalidContentError
        }
      });
    }

    return next();
  }
};
