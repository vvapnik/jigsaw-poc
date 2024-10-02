import {Page} from "@vapnik/jigsaw";
import {ConfigurationService} from "@/services/Configuration/ConfigurationService";
import {ContentfulService} from "@/services/Contentful/ContentfulService";
import {NavigationService} from "@/services/Navigation/NavigationService";
import {Header} from "@/widgets/Header/Header";
import {PageHead} from "@/widgets/PageHead/PageHead";
import {DocumentationLayout} from "@/layouts/documentation";
import {DocumentationArticles} from "@/widgets/DocumentationArticles/DocumentationArticles";

export default async function Documentation() {
    return Page([ConfigurationService, ContentfulService, NavigationService], [Header, PageHead, DocumentationArticles], DocumentationLayout)
}