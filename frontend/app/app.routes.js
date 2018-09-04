(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/dlp', function($location, session) {
      session.ready.then(function() {
        if (!session.userIsDomainAdministrator()) {
          return $location.path('/');
        }

        return $location.path('/dlp/quarantine');
      });
    });

    $stateProvider
      .state('dlp', {
        url: '/dlp',
        templateUrl: '/linagora.esn.unifiedinbox.james/app/dlp/inbox-james-dlp.html',
        resolve: {
          isAdmin: function($location, session) {
            return session.ready.then(function() {
              if (!session.userIsDomainAdministrator()) { $location.path('/'); }
            });
          }
        }
      })
      .state('dlp.quarantine', {
        url: '/quarantine',
        views: {
          'root@dlp': {
            template: '<inbox-james-dlp-quarantine />'
          }
        }
      })
      .state('dlp.settings', {
        url: '/settings',
        views: {
          'root@dlp': {
            template: '<inbox-james-dlp-settings />'
          }
        }
      });
  });
})(angular);
