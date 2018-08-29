(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/quarantine', function($location, session) {
      session.ready.then(function() {
        if (!session.userIsDomainAdministrator()) {
          return $location.path('/');
        }

        return $location.path('/quarantine/settings');
      });
    });

    $stateProvider
      .state('quarantine', {
        url: '/quarantine',
        templateUrl: '/linagora.esn.unifiedinbox.james/app/quarantine/inbox-james-quarantine.html',
        resolve: {
          isAdmin: function($location, session) {
            return session.ready.then(function() {
              if (!session.userIsDomainAdministrator()) { $location.path('/'); }
            });
          }
        }
      })
      .state('quarantine.settings', {
        url: '/settings',
        views: {
          'root@quarantine': {
            template: '<inbox-james-quarantine-settings />'
          }
        }
      });
  });
})(angular);
