module.exports = dependencies => {
  const restoringRequests = require('./restoring-requests')(dependencies);
  const monitoringMessagesRestoration = require('./monitoring')(dependencies);
  const criteriaValidator = require('./criteria-validator');

  return {
    init,
    restoringRequests,
    criteriaValidator
  };

  function init() {
    restoringRequests.init();
    monitoringMessagesRestoration.init();
  }
};
