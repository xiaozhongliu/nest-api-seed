import * as yaml from 'yamljs'

export class ConfigService {
    private readonly envConfig: { [key: string]: string }

    constructor(filePath: string) {
        this.envConfig = yaml.load(filePath)
    }

    get(key: string): string {
        return this.envConfig[key]
    }

    get debug(): boolean {
        return Boolean(this.envConfig.debug)
    }
}
