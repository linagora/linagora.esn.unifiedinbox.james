(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.unifiedinbox.james';

  angular.module(MODULE_NAME, [
    'ui.router',
    'op.dynamicDirective',
    'restangular',
    'uuid4',
    'ngFileSaver',
    'esn.session',
    'esn.configuration',
    'esn.async-action',
    'esn.lodash-wrapper',
    'esn.user',
    'esn.session',
    'esn.infinite-list',
    'esn.i18n',
    'mgcrea.ngStrap.modal',
    'linagora.esn.james',
    'linagora.esn.unifiedinbox'
  ]);
})(angular);
