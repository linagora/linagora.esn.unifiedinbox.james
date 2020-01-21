module.exports = dependencies => {
  const models = require('./db')(dependencies);
  const deletedMessages = require('./deleted-messages')(dependencies);

  return {
    init,
    deletedMessages,
    models
  };

  function init() {
    deletedMessages.init();
  }
};
