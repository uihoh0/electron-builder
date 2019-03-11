/// <reference types="node" />
import { URL } from 'url';
interface HttpDnsURLOpt {
    ip: string;
}
export default class HttpDnsURL extends URL {
    private _ip?;
    private _originHostName?;
    constructor(input: string, base?: string | URL | undefined, options?: HttpDnsURLOpt);
    readonly href: string;
    readonly hostname: string;
    host: string;
    ip: string | undefined;
}
export {};
