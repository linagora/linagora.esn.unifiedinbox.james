module.exports = dependencies => {
  const restoringRequests = require('./restoring-requests')(dependencies);
  const criteriaValidator = require('./criteria-validator');

  return {
    init,
    restoringRequests,
    criteriaValidator
  };

  function init() {
    restoringRequests.init();
  }
};
