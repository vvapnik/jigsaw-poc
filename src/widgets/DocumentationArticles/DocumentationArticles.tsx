import {Widget} from "@vapnik/jigsaw";
import {ContentfulService} from "@/services/Contentful/ContentfulService";
import {queryAllDocuments} from "@/widgets/DocumentationArticles/queryAllDocuments";
import {DocumentationArticle} from "@/widgets/DocumentationArticles/DocumentationArticle";
import {Article} from "@/widgets/DocumentationArticles/types";

import './style.css'
@Widget('DocumentationArticles')
export class DocumentationArticles {

    private allDocumentsQueryRegistration?: Symbol

    constructor(private contentful: ContentfulService) {
        this.registerAllDocumentsQuery()
    }

    private registerAllDocumentsQuery() {
        this.allDocumentsQueryRegistration = this.contentful.registerQuery(queryAllDocuments)
    }

    async resolve() {
//TODO: proper validation
        const response = this.contentful.getQueryResult(this.allDocumentsQueryRegistration!) as Record<string, Article[]>
        if (!response || !response?.items) throw Error('invalid documentation response')
        const articles = response.items
        return <main className="documentation">
            {articles.map(article => <DocumentationArticle article={article}/>)}
        </main>
    }
}
