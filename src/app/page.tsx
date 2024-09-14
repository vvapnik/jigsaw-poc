import {Page} from "@vapnik/jigsaw";
import {Header} from "@/widgets/Header/Header";
import {MainLayout} from "@/Layout";
import {NavigationService} from "@/services/Navigation/NavigationService";
import {ConfigurationService} from "@/services/Configuration/ConfigurationService";
import {ContentfulService} from "@/services/Contentful/ContentfulService";
import {PageService} from "@/services/Page/PageService";

export default async function Home() {
    return Page([ConfigurationService, NavigationService, ContentfulService, PageService], [Header], MainLayout)
}
