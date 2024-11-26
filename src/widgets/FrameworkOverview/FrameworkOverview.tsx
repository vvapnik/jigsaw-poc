import {Widget} from "@vapnik/jigsaw";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {ContentfulService} from "@/services/Contentful/ContentfulService";
import {queryOverview} from "@/widgets/FrameworkOverview/queryOverview";

@Widget('FrameworkOverview')
export class FrameworkOverview {
    private readonly queryRegistration: Symbol

    constructor(private contentful: ContentfulService) {
        this.queryRegistration = contentful.registerQuery(queryOverview)
    }

    async resolve() {
        // TODO: proper types
        const response = this.contentful.getQueryResult(this.queryRegistration!) as any
        const overview = response.items[0]?.content?.json
        return <main className="documentation-article-main">
            {documentToReactComponents(overview)}
        </main>
    }
}