import {Service} from "@vapnik/jigsaw";
import {NavigationService} from "@/services/Navigation/NavigationService";
import {ContentfulService} from "@/services/Contentful/ContentfulService";
import {fetchCurrentPageQuery} from "@/services/Page/queries/fetchCurrentPage";

export type Page = {
    _id: string,
    name: string,
    url: string
}

@Service()
export class PageService {
    private currentPage?: Page
    private readonly currentPageQueryRegistration: Symbol

    constructor(private navigation: NavigationService, private contentful: ContentfulService) {
        this.currentPageQueryRegistration = this.registerCurrentPageQuery()
    }

    private registerCurrentPageQuery(): Symbol {
        return this.contentful.registerQuery(fetchCurrentPageQuery(this.navigation.getCurrentPath() || '/'))
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

    public getPageList() {

    }
}