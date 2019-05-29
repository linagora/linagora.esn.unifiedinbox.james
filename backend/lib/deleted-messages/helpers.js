const Ajv = require('ajv');

module.exports = {
  buildErrorMessage,
  createValidateFunction
};

function buildErrorMessage(errors) {
  return errors.map(error =>
    (error.dataPath ? `${error.dataPath}: ${error.message}` : `${error.message}`)
  ).join('; ');
}

function createValidateFunction(schema) {
  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true
  });

  return ajv.compile(schema);
}
