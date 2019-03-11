"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AliIPResolver", {
  enumerable: true,
  get: function () {
    return _AliIPResolver().default;
  }
});
Object.defineProperty(exports, "BasicIPResolver", {
  enumerable: true,
  get: function () {
    return _BasicIPResolver().default;
  }
});
Object.defineProperty(exports, "dnsResolverManager", {
  enumerable: true,
  get: function () {
    return _dnsResolverManager().default;
  }
});
Object.defineProperty(exports, "HttpDnsURL", {
  enumerable: true,
  get: function () {
    return _HttpDnsURL().default;
  }
});

require("electron");

function _AliIPResolver() {
  const data = _interopRequireDefault(require("./AliIPResolver"));

  _AliIPResolver = function () {
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

function _dnsResolverManager() {
  const data = _interopRequireDefault(require("./dnsResolverManager"));

  _dnsResolverManager = function () {
    return data;
  };

  return data;
}

function _HttpDnsURL() {
  const data = _interopRequireDefault(require("./HttpDnsURL"));

  _HttpDnsURL = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// __ts-babel@6.0.4
//# sourceMappingURL=index.js.map