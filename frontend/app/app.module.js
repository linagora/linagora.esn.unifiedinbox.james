(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.unifiedinbox.james';

  angular.module(MODULE_NAME, [
    'ui.router',
    'op.dynamicDirective',
    'restangular',
    'uuid4',
    'esn.session',
    'esn.configuration',
    'esn.async-action',
    'linagora.esn.james'
  ]);
})(angular);
