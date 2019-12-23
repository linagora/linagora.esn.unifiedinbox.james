(function() {
  'use strict';

  var MODULE_NAME = 'linagora.esn.unifiedinbox.james';
  var MODULE_DIR_NAME = '/unifiedinbox.james';

  angular.module(MODULE_NAME)
    .factory('inboxJamesRestangular', inboxJamesRestangular);

  function inboxJamesRestangular(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(MODULE_DIR_NAME + '/api');
      RestangularConfigurer.setFullResponse(true);
    });
  }
})();
