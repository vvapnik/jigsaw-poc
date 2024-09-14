import {Service} from "@vapnik/jigsaw";
import {ConfigurationService} from "@/services/Configuration/ConfigurationService";

type RegisteredQuery<T = unknown> = {
    query: string
    internalIdentifier: Symbol
    externalIdentifier: string
    response?: T
}


@Service()
export class ContentfulService {
    private queries: RegisteredQuery[] = []
    private token?: string
    private url?: string

    constructor(private configurationService: ConfigurationService) {
        configurationService.requestManyConfigurations(['contentfulURL', 'contentfulToken'])

    }

    async exec() {
        if (!this.queries.length) return
        this.token = this.configurationService.getConfiguration('contentfulToken')
        this.url = this.configurationService.getConfiguration('contentfulURL')
        await this.makeRequest()

    }

    private async makeRequest() {
        const headers = new Headers()
        headers.set('Content-Type', 'application/json')
        headers.set('Authorization', `Bearer ${this.token}`)
        const body = JSON.stringify({query: this.composeQuery()})
        console.log(body)

        const response = await fetch(String(this.url), {
            method: 'POST',
            body,
            headers
        })
        const json = await response.json()
        this.decomposeResponse(json)
    }

    private prepareSingleQuery(registeredQuery: RegisteredQuery): string {
        const {query, externalIdentifier} = registeredQuery
        return `${externalIdentifier}: ${query}`
    }

    private composeQuery(): string {
        return `query {
        ${this.queries.map(query => this.prepareSingleQuery(query))}
        }`.replace(/\n/g, ' ').replace(/\s+/g, ' ')
    }

    public registerQuery(query: string): Symbol {
        const externalIdentifier = makeid()
        const internalIdentifier = Symbol()
        const queryToRegister: RegisteredQuery = {
            query,
            externalIdentifier,
            internalIdentifier
        }
        this.queries.push(queryToRegister)
        return internalIdentifier
    }

    public getQueryResult(queryIdentifier: Symbol): unknown {
        const registeredQuery = this.queries
            .find(registeredQuery => registeredQuery.internalIdentifier === queryIdentifier)
        if (!registeredQuery) throw Error('query is not registered')
        const response = registeredQuery.response
        if (!response) throw Error('query is not executed')
        return response
    }

    private decomposeResponse(response: unknown) {
        console.log('response', response)
        console.log('response type', typeof response)
        if (!response || typeof response !== 'object') throw Error('invalid response type')
        const data = (response as Record<string, unknown>).data
        if (!data || typeof data !== 'object') throw Error('invalid data type')
        for (let i = 0; i < this.queries.length; i++) {
            this.queries[i].response = (data as Record<string, unknown>)[this.queries[i].externalIdentifier]
        }
    }
}


function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
