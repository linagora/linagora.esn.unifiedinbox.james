module.exports = {
  RESTORING_MESSAGES_REQUEST: {
    STATUSES: {
      APPROVED: 'approved'
    },
    COMBINATORS: {
      AND: 'and'
    }
  },
  EVENTS: {
    RESTORING_REQUEST_APPROVED: 'unifiedinbox-james:restoring-deleted-messages-request:approved'
  },
  MONITOR_MESSAGES_RESTORING: {
    WORKER_NAME: 'linagora.esn.unifiedinbox.james:jobqueue:worker:monitor-message-restoring',
    CALL_INTERVAL: 2000,
    TASK_STATUS: {
      COMPLETED: 'completed',
      CANCELLED: 'cancelled',
      FAILED: 'failed'
    },
    REPORT_EMAIL_SUBJECT: 'Report: Deleted messages restoration result',
    MAILBOX_NAME: 'Restored-Messages'
  }
};
