import {Article} from "@/widgets/DocumentationArticles/types";
import {FC} from "react";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

export type ArticleProps = {
    article: Article
}
export const DocumentationArticle: FC<ArticleProps> = ({article}) => {
    return <article className="documnetation-article">
        <h2 className="documentation-article-title">{article.title}</h2>
        <main className="documentation-article-main">
            {documentToReactComponents(article.article.json)}
        </main>
    </article>
}