const DEFAULT_LOCALE = 'en';

module.exports = dependencies => {
  const i18n = dependencies('i18n');
  const esnConfig = dependencies('esn-config');

  i18n.setDefaultConfiguration({ directory: __dirname + '/locales' });

  return {
    getI18nForMailer,
    i18n
  };

  function getI18nForMailer(user) {
    return esnConfig('language').inModule('core').forUser(user, true).get()
      .then((locale = DEFAULT_LOCALE) => ({
        i18n,
        locale,
        translate: (phrase, parameters) => i18n.__({phrase, locale}, parameters)
      }))
      .catch(() => ({
        i18n: i18n,
        locale: DEFAULT_LOCALE,
        translate: (phrase, parameters) => i18n.__(phrase, parameters)
      }));
  }
};
