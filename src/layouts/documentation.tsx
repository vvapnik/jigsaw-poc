import {Layout} from "@vapnik/jigsaw";
import {CommonLayoutTemplate} from "@/layouts/common";

export const DocumentationLayout: Layout = async (widgets) => {
    const {DocumentationArticles} = widgets
    return (
        <CommonLayoutTemplate widgets={widgets}>
            {DocumentationArticles}
        </CommonLayoutTemplate>
    )
}