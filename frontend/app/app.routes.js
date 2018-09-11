(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('admin.domain.dlp', {
        url: '/dlp',
        deepStateRedirect: {
          default: 'admin.domain.dlp.quarantine',
          params: true,
          fn: function() {
            return true;
          }
        }
      })
      .state('admin.domain.dlp.quarantine', {
        url: '/quarantine',
        views: {
          'root@admin': {
            template: '<inbox-james-dlp-quarantine />'
          }
        }
      })
      .state('admin.domain.dlp.rejected', {
        url: '/quarantine',
        views: {
          'root@admin': {
            template: '<inbox-james-dlp-rejected />'
          }
        }
      })
      .state('admin.domain.dlp.settings', {
        url: '/quarantine',
        views: {
          'root@admin': {
            template: '<inbox-james-dlp-settings />'
          }
        }
      });
  });
})(angular);
