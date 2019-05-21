module.exports = dependencies => {

  const UnifiedInboxRestoringMessagesRequests = require('./restoring-messages-requests')(dependencies);

  return {
    UnifiedInboxRestoringMessagesRequests
  };
};
