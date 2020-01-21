const moment = require('moment');
const { parseOneAddress } = require('email-addresses');
const { buildErrorMessage, createValidateFunction } = require('./helpers');

const schema = {
  type: 'object',
  properties: {
    combinator: {
      type: 'string',
      enum: ['and']
    },
    criteria: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          fieldName: {
            type: 'string'
          },
          operator: {
            type: 'string'
          },
          value: {
            type: ['string', 'boolean']
          }
        },
        required: ['fieldName', 'operator', 'value']
      }
    }
  },
  required: ['combinator', 'criteria'],
  additionalProperties: false
};
const validate = createValidateFunction(schema);
const validOperatorsByFieldName = {
  subject: ['contains', 'containsIgnoreCase', 'equals', 'equalsIgnoreCase'],
  deliveryDate: ['beforeOrEquals', 'afterOrEquals'],
  deletionDate: ['beforeOrEquals', 'afterOrEquals'],
  sender: ['equals'],
  recipients: ['contains'],
  hasAttachment: ['equals'],
  originMailboxes: ['contains']
};

const valueValidatorByFieldName = {
  subject: {
    validator: value => typeof value === 'string',
    errorMessage: 'subject value should be a string'
  },
  deliveryDate: {
    validator: value => moment(value, moment.ISO_8601, true).isValid(),
    errorMessage: 'deliveryDate value should be a valid ISO_8601 date'
  },
  deletionDate: {
    validator: value => moment(value, moment.ISO_8601, true).isValid(),
    errorMessage: 'deliveryDate value should be a valid ISO_8601 date'
  },
  sender: {
    validator: value => parseOneAddress(value),
    errorMessage: 'sender value should be a valid email address'
  },
  recipients: {
    validator: value => parseOneAddress(value),
    errorMessage: 'recipients value should be a valid email address'
  },
  hasAttachment: {
    validator: value => typeof value === 'boolean',
    errorMessage: 'hasAttachment value should be a boolean'
  },
  originMailboxes: {
    validator: value => typeof value === 'string',
    errorMessage: 'originMailboxes should be a string'
  }
};

function criterionValidator(criterion) {
  const { fieldName, operator, value } = criterion;

  if (!validOperatorsByFieldName[fieldName] || !valueValidatorByFieldName[fieldName]) {
    return `field name "${fieldName}" is not supported`;
  }

  if (!validOperatorsByFieldName[fieldName].includes(operator)) {
    return `operator "${operator}" is not supported by "${fieldName}" field name`;
  }

  if (!valueValidatorByFieldName[fieldName].validator(value)) {
    return valueValidatorByFieldName[fieldName].errorMessage;
  }

  return null;
}

function validateCriteria(criteria) {
  for (const criterion of criteria) {
    const err = criterionValidator(criterion);

    if (err) {
      return err;
    }
  }

  return null;
}

function validator(query) {
  const valid = validate(query);

  if (!valid) {
    return buildErrorMessage(validate.errors);
  }

  return validateCriteria(query.criteria);
}

module.exports = validator;
