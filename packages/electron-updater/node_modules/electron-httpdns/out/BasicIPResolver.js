"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class BasicIPResolver {
  constructor(servers) {
    this.servers = [];
    this.ipsCache = {};

    if (!servers) {
      return;
    }

    if (Array.isArray(servers)) {
      this.servers = this.servers.concat(servers);
      return;
    }

    this.servers.push(servers);
  }

  async resolve(host, servers) {
    const cache = this.ipsCache[host];

    if (cache) {
      return cache[0];
    }

    const ips = await this.loopResolve(host, servers || this.servers);

    if (!ips || ips.length < 1) {
      return false;
    }

    this.ipsCache[host] = ips;
    return ips[0];
  }

  async createRequestUrl(dnsServer, host) {
    return `http://${dnsServer}/?${host}`;
  }

  async loopResolve(host, servers) {
    const _servers = (servers || []).slice(0);

    if (_servers.length < 1) {
      return null;
    }

    _servers.sort(() => Math.random() > 0.5 ? -1 : 1);

    const dnsServer = _servers.pop();

    let url = await this.createRequestUrl(dnsServer, host);

    if (!url) {
      return null;
    }

    try {
      return await this.request(url);
    } catch (e) {
      // console.log('error:', e)
      return await this.loopResolve(host, _servers);
    }
  }

} exports.default = BasicIPResolver;
// __ts-babel@6.0.4
//# sourceMappingURL=BasicIPResolver.js.map