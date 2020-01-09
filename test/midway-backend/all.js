/* eslint-disable no-console, no-process-env */

const chai = require('chai');
const path = require('path');
const testConfig = require('../config/servers-conf');
const basePath = path.resolve(__dirname + '/../../node_modules/linagora-rse');
const backendPath = path.normalize(__dirname + '/../../backend');
const MODULE_NAME = 'unifiedinbox.james';
const AWESOME_MODULE_NAME = `linagora.esn.${MODULE_NAME}`;
let rse;

before(function(done) {
  chai.use(require('chai-shallow-deep-equal'));
  chai.use(require('sinon-chai'));
  chai.use(require('chai-as-promised'));

  this.testEnv = {
    serversConfig: testConfig,
    basePath: basePath,
    backendPath: backendPath,
    fixtures: path.resolve(basePath, 'test/midway-backend/fixtures'),
    mongoUrl: testConfig.mongodb.connectionString,
    initCore(callback) {
      rse.core.init(() => { callback && process.nextTick(callback); });
    }
  };

  process.env.NODE_CONFIG = 'test/config';
  process.env.NODE_ENV = 'test';
  process.env.REDIS_HOST = 'redis';
  process.env.REDIS_PORT = 6379;
  process.env.AMQP_HOST = 'rabbitmq';
  process.env.ES_HOST = 'elasticsearch';

  rse = require('linagora-rse');
  this.helpers = {};
  this.testEnv.core = rse.core;
  this.testEnv.moduleManager = rse.moduleManager;
  rse.test.helpers(this.helpers, this.testEnv);
  rse.test.moduleHelpers(this.helpers, this.testEnv);
  rse.test.apiHelpers(this.helpers, this.testEnv);

  const manager = this.testEnv.moduleManager.manager;
  const nodeModulesPath = path.normalize(
    path.join(__dirname, '../../node_modules/')
  );

  const loader = manager.loaders.code(require('../../index.js'), true);
  const nodeModulesLoader = manager.loaders.filesystem(nodeModulesPath, true);

  manager.appendLoader(loader);
  manager.appendLoader(nodeModulesLoader);

  loader.load(AWESOME_MODULE_NAME, done);
});

before(function(done) {
  const self = this;

  self.helpers.modules.initMidway(AWESOME_MODULE_NAME, error => {
    if (error) return done(error);

    const expressApp = require(`${self.testEnv.backendPath}/webserver/application`)(self.helpers.modules.current.deps);
    const api = require(`${self.testEnv.backendPath}/webserver/api`)(self.helpers.modules.current.deps, self.helpers.modules.current.lib.lib);

    expressApp.use(require('body-parser').json());
    expressApp.use('/unifiedinbox.james/api', api);
    self.helpers.modules.current.app = self.helpers.modules.getWebServer(expressApp);
    self.helpers.modules.current.lib.lib.init();

    done();
  });
});

afterEach(function(done) {
  this.helpers.mongo.dropDatabase(err => done(err));
});
