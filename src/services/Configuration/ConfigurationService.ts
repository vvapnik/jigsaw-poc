import {Service} from "@vapnik/jigsaw";
import 'dotenv/config'

export type Configuration = {
    contentfulURL: string,
    contentfulToken: string
}
type ConfigKey = keyof Configuration
const envMap: Record<ConfigKey, string> = {
    contentfulURL: 'CONTENTFUL_URL',
    contentfulToken: 'CONTENTFUL_TOKEN'
}

@Service()
export class ConfigurationService {
    private configuration?: Partial<Configuration>
    private requestedConfigurations: Set<ConfigKey> = new Set()

    constructor() {
        this.requestManyConfigurations(['contentfulToken', 'contentfulURL'])
    }

    private getFromEnv(): Partial<Configuration> {
        const newConfig: Partial<Configuration> = {}
        for (let configKey of Array.from(this.requestedConfigurations)) {
            newConfig[configKey] = String(process.env[envMap[configKey]])
        }
        return newConfig
    }

    async exec() {
        this.configuration = this.getFromEnv()
    }

    public getConfiguration(code: keyof Configuration): string | undefined {
        if (!this.configuration) throw Error('configuration is not loaded')
        return this.configuration[code]
    }

    public requestConfiguration(name: ConfigKey) {
        this.requestedConfigurations.add(name)
    }

    public requestManyConfigurations(names: ConfigKey[]) {
        names.forEach((name) => this.requestConfiguration(name))
    }
}