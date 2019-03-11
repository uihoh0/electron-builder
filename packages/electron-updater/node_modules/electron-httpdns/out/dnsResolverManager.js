"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateInfoPath = getUpdateInfoPath;
exports.getUpdateInfo = getUpdateInfo;
exports.default = dnsResolverManager;

function _fsExtraP() {
  const data = require("fs-extra-p");

  _fsExtraP = function () {
    return data;
  };

  return data;
}

function _jsYaml() {
  const data = require("js-yaml");

  _jsYaml = function () {
    return data;
  };

  return data;
}

var _path = _interopRequireDefault(require("path"));

function _electron() {
  const data = _interopRequireDefault(require("electron"));

  _electron = function () {
    return data;
  };

  return data;
}

function _AliIPResolver() {
  const data = _interopRequireDefault(require("./AliIPResolver"));

  _AliIPResolver = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = _electron().default.app || _electron().default.remote.app;

function getUpdateInfoPath() {
  return app.isPackaged ? _path.default.join(process.resourcesPath, "app-update.yml") : _path.default.join(app.getAppPath(), 'dev-app-update.yml');
}

let httpdnsConfig;
let resolver = false;

async function getUpdateInfo() {
  if (httpdnsConfig !== undefined) {
    return httpdnsConfig;
  }

  const configPath = getUpdateInfoPath();
  const config = (0, _jsYaml().safeLoad)((await (0, _fsExtraP().readFile)(configPath, "utf-8")));
  httpdnsConfig = config.httpdns ? config.httpdns : null;
  return httpdnsConfig;
}

async function dnsResolverManager() {
  if (resolver) {
    return resolver;
  }

  const httpdns = await getUpdateInfo();

  if (!httpdns) {
    return false;
  }

  switch (httpdns.type) {
    case 'ali':
      resolver = new (_AliIPResolver().default)(httpdns);
      break;

    default:
      break;
  }

  return resolver;
} 
// __ts-babel@6.0.4
//# sourceMappingURL=dnsResolverManager.js.map