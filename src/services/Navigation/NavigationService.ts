import {Service} from "@vapnik/jigsaw";
import {headers} from "next/headers";
import {ContentfulService} from "@/services/Contentful/ContentfulService";
import {fetchCurrentPageQuery} from "@/services/Navigation/queries/fetchCurrentPage";

const HEADER_URL = 'x-navigation-url'

export type Page = {
    _id: string,
    name: string,
    url: string
}

@Service()
export class NavigationService {
    private currentPage?: Page
    private readonly currentPageQueryRegistration: Symbol

    constructor(private contentful: ContentfulService) {
        this.currentPageQueryRegistration = this.registerCurrentPageQuery()
    }

    private registerCurrentPageQuery(): Symbol {
        return this.contentful.registerQuery(fetchCurrentPageQuery(this.getCurrentPath()))
    }

    public getCurrentPage(): Page {
        if (!this.currentPage) {
            const queryResponse = this.contentful.getQueryResult(this.currentPageQueryRegistration)

            const page = ((queryResponse as Record<string, unknown>)?.items as Page[])[0]
            if (!page) {
                throw Error('404 current page not found')
            }
            this.currentPage = page
        }
        return this.currentPage
    }

    getCurrentPath(): string {
        const headersList = headers()
        const pathHeader = headersList.get(HEADER_URL)
        if (!pathHeader) throw Error('path header is not set')
        return pathHeader
    }

    async exec() {
        this.getCurrentPath()
    }
}