'use strict';

/* global _: false */

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
    return {
      ready: $q.when(),
      domain: {}
    };
  });
angular.module('esn.configuration', [])
  .factory('esnConfig', function() {
    return function() {
      return $q.when({});
    };
  });
angular.module('linagora.esn.james', [])
  .factory('jamesApiClient', function() {
    return {};
  });
angular.module('esn.async-action', [])
  .factory('asyncAction', function() {
    return function(message, action) {
      return action();
    };
  });
angular.module('esn.user', [])
  .factory('userAPI', function() {
    return {
      getUsersByEmail: angular.noop
    };
  })
  .factory('userUtils', function() {
    return {
      displayNameOf: angular.noop
    };
  });
angular.module('esn.lodash-wrapper', [])
  .constant('_', _);
angular.module('linagora.esn.unifiedinbox', []);
angular.module('esn.infinite-list', []);
angular.module('ngFileSaver', [])
  .factory('FileSaver', function() {
    return {
      saveAs: angular.noop
    };
  });
angular.module('esn.i18n', [])
  .factory('esnI18nService', function() {
    return {
      translate: function(text) {
        return text;
      }
    };
  });
angular.module('mgcrea.ngStrap.modal', [])
  .factory('$modal', function() {
    return angular.noop;
  });
