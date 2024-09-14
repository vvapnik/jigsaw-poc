import {Page} from "@vapnik/jigsaw";
import {NavigationService} from "@/services/Navigation/NavigationService";
import {Header} from "@/widgets/Header/Header";
import {MainLayout} from "@/Layout";
import {PageService} from "@/services/Page/PageService";
import {ConfigurationService} from "@/services/Configuration/ConfigurationService";
import {ContentfulService} from "@/services/Contentful/ContentfulService";

export default async function GenericPage() {
    return Page([ConfigurationService, NavigationService, ContentfulService, PageService ], [Header], MainLayout)
}