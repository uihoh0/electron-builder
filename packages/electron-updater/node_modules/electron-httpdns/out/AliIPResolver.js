"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.aliServers = void 0;

function _builderUtilRuntime() {
  const data = require("builder-util-runtime");

  _builderUtilRuntime = function () {
    return data;
  };

  return data;
}

function _ElectronHttpExecutor() {
  const data = require("electron-updater/out/ElectronHttpExecutor");

  _ElectronHttpExecutor = function () {
    return data;
  };

  return data;
}

function _url() {
  const data = require("url");

  _url = function () {
    return data;
  };

  return data;
}

function _md() {
  const data = _interopRequireDefault(require("md5"));

  _md = function () {
    return data;
  };

  return data;
}

function _BasicIPResolver() {
  const data = _interopRequireDefault(require("./BasicIPResolver"));

  _BasicIPResolver = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const aliServers = ['203.107.1.1', '203.107.1.33', '203.107.1.34', '203.107.1.35'];
exports.aliServers = aliServers;

class AliIPResolver extends _BasicIPResolver().default {
  constructor(config) {
    super(config.servers || aliServers);
    this.secret = config.secret;
    this.accountId = config.accountId;
  }

  async request(url) {
    const httpExecutor = new (_ElectronHttpExecutor().ElectronHttpExecutor)((authInfo, callback) => callback);
    const opts = {};
    (0, _builderUtilRuntime().configureRequestUrl)(new (_url().URL)(url), opts);
    let resultStr;
    resultStr = await httpExecutor.request(opts);
    const result = resultStr ? JSON.parse(resultStr) : {};
    return result.ips;
  }

  async createRequestUrl(dnsServer, host) {
    if (!dnsServer) {
      return '';
    }

    const now = new Date();
    let timestamp = now.setMinutes(now.getMinutes() + 4);
    timestamp = Math.round(timestamp / 1000);
    return `http://${dnsServer}/${this.accountId}/sign_d?host=${host}&t=${timestamp}&s=${(0, _md().default)(`${host}-${this.secret}-${timestamp}`)}`;
  }

} exports.default = AliIPResolver;
// __ts-babel@6.0.4
//# sourceMappingURL=AliIPResolver.js.map