export interface IPArray extends Array<string> {
}
export interface HttpDnsConfig {
    type: string;
}
export default abstract class BasicIPResolver {
    constructor(servers?: Array<string> | string);
    private servers;
    ipsCache: {
        [index: string]: Array<string>;
    };
    abstract request(url: string): Promise<IPArray | null | undefined>;
    resolve(host: string, servers?: Array<string>): Promise<string | false | null>;
    createRequestUrl(dnsServer: string | undefined, host: string): Promise<string>;
    protected loopResolve(host: string, servers?: IPArray): Promise<IPArray | null | undefined>;
}
