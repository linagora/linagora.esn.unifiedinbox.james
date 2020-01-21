const { WORKER_NAME } = require('../../constants').MONITOR_MESSAGES_RESTORING;

module.exports = depedencies => {
  const jobqueue = depedencies('jobqueue');

  return {
    init,
    startMonitoring
  };

  function init() {
    jobqueue.lib.addWorker(require('./worker')(depedencies));
  }

  function startMonitoring({ taskId, targetUser }) {
    jobqueue.lib.submitJob(WORKER_NAME, { taskId, targetUser });
  }
};
