import {Page} from "@vapnik/jigsaw";
import {NavigationService} from "@/services/Navigation/NavigationService";
import {Header} from "@/widgets/Header/Header";
import {ConfigurationService} from "@/services/Configuration/ConfigurationService";
import {ContentfulService} from "@/services/Contentful/ContentfulService";
import {PageHead} from "@/widgets/PageHead/PageHead";
import {Main} from "@/layouts/main";

export default async function GenericPage() {
    return Page([ConfigurationService, ContentfulService, NavigationService], [Header, PageHead], Main)
}