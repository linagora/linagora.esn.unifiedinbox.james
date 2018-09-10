(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.james')
    .factory('inboxJamesMailRepository', inboxJamesMailRepository);

  function inboxJamesMailRepository(
    _,
    $q,
    InboxJamesMailRepositoryEmail,
    jamesWebadminClient,
    userAPI,
    userUtils,
    INBOX_MAIL_REPOSITORY_EMAIL_FIELDS
  ) {
    return {
      downloadEmlFile: downloadEmlFile,
      list: list
    };

    function downloadEmlFile(repositoryId, emailKey) {
      jamesWebadminClient.downloadEmlFileFromMailRepository(repositoryId, emailKey);
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
        additionalFields: INBOX_MAIL_REPOSITORY_EMAIL_FIELDS
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
