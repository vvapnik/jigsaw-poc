import {Layout} from "@vapnik/jigsaw";
import {CommonLayoutTemplate} from "@/layouts/common";

export const Main: Layout = async (widgets) => {
    return <CommonLayoutTemplate widgets={widgets}>
        {widgets["FrameworkOverview"]}
    </CommonLayoutTemplate>
}