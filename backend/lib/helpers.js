const { STATUSES, COMBINATORS } = require('./constants').RESTORING_MESSAGES_REQUEST;

module.exports = {
  isValidRestoringMessagesRequestCombinator,
  isValidRestoringMessagesRequestStatus
};

function isValidRestoringMessagesRequestCombinator(combinator) {
  return Object.values(COMBINATORS).indexOf(combinator) > -1;
}

function isValidRestoringMessagesRequestStatus(status) {
  return Object.values(STATUSES).indexOf(status) > -1;
}
