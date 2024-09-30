import * as React from "react";
import {Layout} from "@vapnik/jigsaw";

export const MainLayout: Layout = async ({Header}) => {
    return (
        <html lang="en">

        <body>
        <div>
            {Header}
        </div>
        </body>
        </html>
    )
}