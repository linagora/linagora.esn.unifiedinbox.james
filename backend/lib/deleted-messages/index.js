module.exports = dependencies => {
  const restoringRequests = require('./restoring-requests')(dependencies);

  return {
    init,
    restoringRequests
  };

  function init() {
    restoringRequests.init();
  }
};
