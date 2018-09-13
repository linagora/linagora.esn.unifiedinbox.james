(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .run(injectRejectedActionsDirective);

  function injectRejectedActionsDirective(
    session,
    dynamicDirectiveService,
    inboxJamesDlpService,
    INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES
  ) {
    session.ready.then(function() {
      var mailRepositoryPath = inboxJamesDlpService.getMailRepositoryPath(INBOX_JAMES_DLP_MAIL_REPOSITORY_PATH_PREFIXES.REJECTED);
      var rejectedActionsDirective = new dynamicDirectiveService.DynamicDirective(true, 'inbox-james-dlp-rejected-actions', {
        attributes: [
          { name: 'ng-if', value: '$ctrl.repository==="' + mailRepositoryPath + '"' },
          { name: 'ng-show', value: '$ctrl.getNumberOfSelectedEmails() || $ctrl.bulkAction' },
          { name: 'bulk-action', value: '$ctrl.bulkAction' }
        ]
      });

      dynamicDirectiveService.addInjection('mail-repository-extra-actions', rejectedActionsDirective);

      var rejectedEmailExtraActionsDirective = new dynamicDirectiveService.DynamicDirective(true, 'inbox-james-dlp-rejected-actions', {
        attributes: [
          { name: 'ng-if', value: '$ctrl.email.repository==="' + mailRepositoryPath + '"' },
          { name: 'email', value: '$ctrl.email' },
          { name: 'on-click', value: '$hide()' }
        ]
      });

      dynamicDirectiveService.addInjection('email-extra-actions', rejectedEmailExtraActionsDirective);
    });
  }
})(angular);
