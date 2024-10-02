import {Service} from "@vapnik/jigsaw";
import {headers} from "next/headers";
import {ContentfulService} from "@/services/Contentful/ContentfulService";
import {fetchPagesQuery} from "@/services/Navigation/queries/fetchCurrentPage";

const HEADER_URL = 'x-navigation-url'

export type Page = {
    _id: string,
    name: string,
    url: string
}

@Service()
export class NavigationService {
    private currentPage?: Page
    private pagesList?: Page[]
    private readonly pagesQueryRegistration: Symbol

    constructor(private contentful: ContentfulService) {
        this.pagesQueryRegistration = this.registerPagesQuery()
    }

    private registerPagesQuery(): Symbol {
        return this.contentful.registerQuery(fetchPagesQuery())
    }

    public getCurrentPage(): Page {
        if (!this.currentPage) {
            const queryResponse = this.contentful.getQueryResult(this.pagesQueryRegistration)

            const pages = ((queryResponse as Record<string, unknown>)?.items as Page[])
            const currentPage = pages.find(page => page.url === this.getCurrentPath())
            if (!currentPage) {
                throw Error('404 current page not found')
            }
            this.currentPage = currentPage
        }
        return this.currentPage
    }

    public getPagesList(): Page[] {
        if (!this.pagesList) {
            const queryResponse = this.contentful.getQueryResult(this.pagesQueryRegistration)
            this.pagesList = ((queryResponse as Record<string, unknown>)?.items as Page[])
        }
        return this.pagesList
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