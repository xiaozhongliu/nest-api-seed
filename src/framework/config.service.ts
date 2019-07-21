import * as os from 'os'
import * as yaml from 'yamljs'
import * as pack from '../../package.json'

export class ConfigService {
    private readonly envConfig: { [key: string]: string }
    get(key: string): string {
        return this.envConfig[key]
    }

    constructor(filePath: string) {
        this.envConfig = yaml.load(filePath)

        const networksOrigin = os.networkInterfaces()
        const networks = networksOrigin.eth0
            || networksOrigin.eth1
            || networksOrigin.en0
            || networksOrigin.en1
            || networksOrigin.本地连接
        const info = networks.find(network => network.family === 'IPv4')
        Object.assign(this.envConfig, {
            serverName: os.hostname(),
            serverIP: info.address,
        })
    }

    get APP_NAME(): string { return pack.name }
    get SERVER_IP(): string { return this.envConfig.serverIP }
    get SERVER_NAME(): string { return this.envConfig.serverName }

    get DEBUG(): boolean { return Boolean(this.envConfig.debug) }
}
