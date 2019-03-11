import { CancellationToken, GenericServerOptions, HttpError, newError, UpdateInfo, WindowsUpdateInfo } from "builder-util-runtime"
import { AppUpdater } from "../AppUpdater"
import { getChannelFilename, newBaseUrl, newUrlFromBase, Provider, ResolvedUpdateFileInfo } from "../main"
import { parseUpdateInfo, ProviderRuntimeOptions, resolveFiles } from "./Provider"
import { dnsResolverManager, HttpDnsURL } from 'electron-httpdns'
import { OutgoingHttpHeaders } from "http"




export class GenericProvider extends Provider<UpdateInfo> {
  private readonly baseUrl = newBaseUrl(this.configuration.url)

  constructor(private readonly configuration: GenericServerOptions, private readonly updater: AppUpdater, runtimeOptions: ProviderRuntimeOptions) {
    super(runtimeOptions)
  }

  private get channel(): string {
    const result = this.updater.channel || this.configuration.channel
    return result == null ? this.getDefaultChannelName() : this.getCustomChannelName(result)
  }
  private ipCache: { [index: string]: string } = {}


  async getLatestVersion(): Promise<UpdateInfo> {
    const channelFile = getChannelFilename(this.channel)
    let channelUrl = newUrlFromBase(channelFile, this.baseUrl, this.updater.isAddNoCacheQuery)
    // channelUrl = await resolveIPUrl(channelUrl)
    const dnsResolver = await dnsResolverManager()
    if (dnsResolver) {
      const ip = await dnsResolver.resolve(channelUrl.host)
      if (ip) {
        channelUrl = new HttpDnsURL('', channelUrl, {
          ip: ip
        })
        this.ipCache[channelUrl.host] = ip
      }
    }
    for (let attemptNumber = 0; ; attemptNumber++) {
      try {
        return parseUpdateInfo(await this.httpRequest(channelUrl, { host: channelUrl.hostname }), channelFile, channelUrl)
      }
      catch (e) {
        if (e instanceof HttpError && e.statusCode === 404) {
          throw newError(`Cannot find channel "${channelFile}" update info: ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND")
        }
        else if (e.code === "ECONNREFUSED") {
          if (attemptNumber < 3) {
            await new Promise((resolve, reject) => {
              try {
                setTimeout(resolve, 1000 * attemptNumber)
              }
              catch (e) {
                reject(e)
              }
            })
            continue
          }
        }
        throw e
      }
    }
  }
  get fileExtraDownloadHeaders(): OutgoingHttpHeaders | null {
    return { host: this.baseUrl.hostname }
  }
  protected httpRequest(url: URL, headers?: OutgoingHttpHeaders | null, cancellationToken?: CancellationToken) {
    const options = this.createRequestOptions(url, { ...headers, host: url.host || url.hostname })
    return this.executor.request(options, cancellationToken)
  }
  resolveFiles(updateInfo: UpdateInfo): Array<ResolvedUpdateFileInfo> {
    const file = resolveFiles(updateInfo, this.baseUrl).map(info => {
      let url = info.url
      const ip = this.ipCache[url.host]
      if (ip) {
        url = new HttpDnsURL('', url, {
          ip
        })
      }
      return {
        ...info,
        url
      }
    })
    const packages = (updateInfo as WindowsUpdateInfo).packages
    const packageInfo = packages == null ? null : (packages[process.arch] || packages.ia32)
    if (packageInfo != null) {
      const file0 = file[0] as any;
      const file0url = new HttpDnsURL(file0.path, undefined);
      if (this.ipCache[file0url.host]) {
        file0url.ip = this.ipCache[file0url.host]
      }
      file0.packageInfo = {
        ...packageInfo,
        path: file0url.href
      }
    }
    return file
  }
}