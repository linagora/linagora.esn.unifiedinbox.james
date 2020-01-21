module.exports = dependencies => {

  const UnifiedInboxRestoringDeletedMessagesRequests = require('./restoring-deleted-messages-requests')(dependencies);

  return {
    UnifiedInboxRestoringDeletedMessagesRequests
  };
};
