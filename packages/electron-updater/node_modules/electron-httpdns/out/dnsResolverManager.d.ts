import BasicIPResolver from './BasicIPResolver';
export declare function getUpdateInfoPath(): string;
export declare function getUpdateInfo(): Promise<any>;
export default function dnsResolverManager(): Promise<BasicIPResolver | false>;
