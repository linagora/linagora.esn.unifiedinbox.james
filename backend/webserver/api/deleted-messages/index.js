module.exports = (dependencies, lib, router) => {
  const authorizationMW = dependencies('authorizationMW');
  const middleware = require('./middleware')(dependencies, lib);
  const controller = require('./controller')(dependencies, lib);

  router.post('/restoringDeletedMessagesRequest',
    authorizationMW.requiresAPILogin,
    middleware.validateRestoringRequest,
    controller.createRestoringRequest
  );

  return router;
};
