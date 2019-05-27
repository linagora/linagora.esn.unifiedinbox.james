module.exports = (dependencies, lib, router) => {
  const authorizationMW = dependencies('authorizationMW');
  const controller = require('./controller')(dependencies, lib);

  router.post('/restoringDeletedMessagesRequest',
    authorizationMW.requiresAPILogin,
    controller.createRestoringRequest
  );

  return router;
};
