import {Page} from "@vapnik/jigsaw";
import {Header} from "@/widgets/Header/Header";
import {Main} from "@/layouts/main";
import {NavigationService} from "@/services/Navigation/NavigationService";
import {ConfigurationService} from "@/services/Configuration/ConfigurationService";
import {ContentfulService} from "@/services/Contentful/ContentfulService";
import {PageHead} from "@/widgets/PageHead/PageHead";

export default async function Home() {
    return Page([ConfigurationService, ContentfulService, NavigationService], [Header, PageHead], Main)
}
