(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .factory('inboxJamesMailRepository', inboxJamesMailRepository);

  function inboxJamesMailRepository(
    _,
    $q,
    $modal,
    $rootScope,
    InboxJamesMailRepositoryEmail,
    jamesWebadminClient,
    userAPI,
    userUtils,
    INBOX_JAMES_MAIL_REPOSITORY_EMAIL_FIELDS,
    INBOX_JAMES_MAIL_REPOSITORY_EVENTS
  ) {
    return {
      deleteAllMails: deleteAllMails,
      deleteMails: deleteMails,
      downloadEmlFile: downloadEmlFile,
      list: list,
      openMailsDeletingModal: openMailsDeletingModal
    };

    function downloadEmlFile(repositoryId, emailKey) {
      jamesWebadminClient.downloadEmlFileFromMailRepository(repositoryId, emailKey);
    }

    function deleteMails(emails) {
      return $q.all(emails.map(function(email) {
        return jamesWebadminClient.deleteMailInMailRepository(email.repository, email.name);
      })).then(function() {
        $rootScope.$broadcast(INBOX_JAMES_MAIL_REPOSITORY_EVENTS.MAILS_REMOVED, {
          emails: emails
        });
      });
    }

    function deleteAllMails(repositoryId) {
      return jamesWebadminClient.deleteAllMailsInMailRepository(repositoryId)
        .then(function() {
          $rootScope.$broadcast(INBOX_JAMES_MAIL_REPOSITORY_EVENTS.ALL_MAILS_REMOVED);
        });
    }

    function openMailsDeletingModal(context) {
      $modal({
        templateUrl: '/linagora.esn.unifiedinbox.james/app/mail-repository/email/delete/inbox-james-mail-repository-email-delete-dialog.html',
        backdrop: 'static',
        placement: 'center',
        controller: 'inboxJamesMailRepositoryEmailDeleteDialogController',
        controllerAs: '$ctrl',
        locals: {
          context: context
        }
      });
    }

    function list(repositoryId, options) {
      return jamesWebadminClient.listMailsInMailRepository(repositoryId, options)
        .then(function(emailKeys) {
          var gettingAllMails = emailKeys.map(function(key) {
            return _getMailDetails(repositoryId, key);
          });

          return $q.all(gettingAllMails);
        });
    }

    function _getMailDetails(repositoryId, emailKey) {
      return jamesWebadminClient.getMailInMailRepository(repositoryId, emailKey, {
        additionalFields: INBOX_JAMES_MAIL_REPOSITORY_EMAIL_FIELDS
      }).then(_includeRepository)
        .then(_populateSender)
        .then(function(email) {
          return new InboxJamesMailRepositoryEmail(email);
        });

      function _includeRepository(email) {
        email.repository = repositoryId;

        return email;
      }

      function _populateSender(email) {
        if (!email.sender) {
          return $q.when(email);
        }

        return userAPI.getUsersByEmail(email.sender)
          .then(function(response) {
            var foundUser = response.data && response.data[0] || {};

            email.sender = _.assign({}, foundUser, {
              email: email.sender,
              name: userUtils.displayNameOf(foundUser) || email.sender
            });

            return email;
          })
          .catch(function() {
            return email;
          });
      }
    }
  }
})(angular);
