'use strict';

angular.module('esn.form.helper', []);
angular.module('pascalprecht.translate', [])
  .provider('$translate', function() {
    return {
      useSanitizeValueStrategy: angular.noop,
      preferredLanguage: angular.noop,
      useStaticFilesLoader: angular.noop,
      $get: angular.noop
    };
  });
angular.module('esn.session', [])
  .factory('session', function() {
    return {};
  });
angular.module('esn.configuration', [])
  .factory('esnConfig', function() {
    return {};
  });
angular.module('linagora.esn.james', [])
  .factory('jamesWebadminClient', function() {
    return {};
  });
angular.module('esn.async-action', [])
  .factory('asyncAction', function() {
    return function(message, action) {
      return action();
    };
  });
