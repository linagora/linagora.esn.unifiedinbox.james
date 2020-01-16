const path = require('path');
const { promisify } = require('util');
const TEMPLATE_PATH = path.resolve(__dirname, '../../templates/email');

module.exports = dependencies => {
  const emailModule = dependencies('email');
  const helpers = dependencies('helpers');
  const { getI18nForMailer } = require('../lib/i18n')(dependencies);

  return { send };

  function send({user, subject, emailTemplateName, content = {}}) {
    return Promise.all([
      promisify(helpers.config.getBaseUrl)(user),
      getI18nForMailer(user)
    ])
      .then(([baseUrl, i18nConf]) => emailModule.getMailer(user).sendHTML(
        {
          encoding: 'base64',
          subject: i18nConf.translate(subject),
          to: user.preferredEmail
        },
        { name: emailTemplateName, path: TEMPLATE_PATH },
        {
          content: { ...content, baseUrl },
          translate: i18nConf.translate
        }
      ));
  }
};
