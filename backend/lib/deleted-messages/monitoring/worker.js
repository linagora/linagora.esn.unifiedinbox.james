const { WORKER_NAME, CALL_INTERVAL, TASK_STATUS } = require('../../constants').MONITOR_MESSAGE_RESTORING;
const util = require('util');

module.exports = dependencies => {
  const jamesModule = dependencies('james');
  const logger = dependencies('logger');
  const userModule = dependencies('user');

  return {
    name: WORKER_NAME,
    handler: {
      handle,
      getTitle
    }
  };

  function handle(job) {
    const { targetUser, taskId } = job.data;

    return _resolveUser(targetUser)
      .then(user => _checkTaskPeriodically({ taskId, user }))
      .catch(error => {
        logger.error('Checking deleted messages restoration failed: ', error);

        throw error;
      });
  }

  function _checkTaskPeriodically({ taskId, user }) {
    return new Promise((resolve, reject) => {
      const iterate = firstIteration => {
        const checkTask = () => jamesModule.lib.client.getTask(taskId).then(task => {
          if (
            task && task.status &&
            Object.values(TASK_STATUS).includes(task.status)
          ) return resolve({ task, user });

          iterate();
        }).catch(reject);

        if (firstIteration) return checkTask();

        setTimeout(checkTask, CALL_INTERVAL);
      };

      iterate(true);
    });
  }

  function _resolveUser(userId) {
    return util.promisify(userModule.get)(userId)
      .then(user => {
        if (user) return user;

        throw new Error(`Unable to find target user with ID ${userId} for deleted messages restoration task`);
      });
  }

  function getTitle(jobData) {
    return `Monitor message restoring process by task id: ${jobData.taskId}`;
  }
};

