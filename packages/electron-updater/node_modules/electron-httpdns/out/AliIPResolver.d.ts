import BasicIPResolver, { IPArray, HttpDnsConfig } from './BasicIPResolver';
export interface AliHttpDNSResult {
    readonly ips: Array<string>;
    readonly host: string;
    readonly ttl: number;
    readonly origin_ttl: number;
}
export declare const aliServers: string[];
export interface AliDnsConfig extends HttpDnsConfig {
    secret: string;
    accountId: string;
    servers?: Array<string> | string;
}
export default class AliIPResolver extends BasicIPResolver {
    constructor(config: AliDnsConfig);
    protected secret: string;
    protected accountId: string;
    request(url: string): Promise<IPArray | null | undefined>;
    createRequestUrl(dnsServer: string | undefined, host: string): Promise<string>;
}
