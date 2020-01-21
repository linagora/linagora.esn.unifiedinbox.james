const { STATUSES, COMBINATORS } = require('../constants').RESTORING_MESSAGES_REQUEST;
const {
  isValidRestoringMessagesRequestCombinator,
  isValidRestoringMessagesRequestStatus
} = require('../helpers');

module.exports = dependencies => {
  const { mongoose } = dependencies('db').mongo;

  /**
   * RestoringMessagesRequestCriteria schema
   *
   * fieldName: the field which applys criteria
   * operator: the operator of criteria
   * value: a plain string represents for the matching value of corresponding field
   */
  const RestoringMessagesRequestCriteriaSchema = new mongoose.Schema({
    fieldName: { type: String, required: true },
    operator: { type: String, required: true },
    value: { type: String, required: true }
  }, {_id: false});

  /**
   * UnifiedInboxRestoringDeletedMessagesRequests schema
   *
   * targetUser: The user whose messages are restored
   * issuer: The user who reviewed the request
   * content: Content of the request which contains:
   *          + combinator: The rule which combines restoring criterias. Default is "and"
   *          + criteria: an array of restoring criterias
   * status: Status of the request. Default is "pending"
   * message: The request message
   * createdAt: creation time
   * updatedAt: update time
   */
  const UnifiedInboxRestoringDeletedMessagesRequestsSchema = new mongoose.Schema({
    targetUser: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    issuer: { type: mongoose.Schema.ObjectId, ref: 'User' },
    content: {
      combinator: {
        type: String,
        default: COMBINATORS.AND,
        validate: [isValidRestoringMessagesRequestCombinator, 'Invalid restoring messages request combinator']
      },
      criteria: [RestoringMessagesRequestCriteriaSchema]
    },
    status: {
      type: String,
      default: STATUSES.PENDING,
      validate: [isValidRestoringMessagesRequestStatus, 'Invalid restoring messages request status']
    },
    message: { type: String }
  }, { timestamps: true });

  module.exports = mongoose.model('UnifiedInboxRestoringDeletedMessagesRequests', UnifiedInboxRestoringDeletedMessagesRequestsSchema);
};
