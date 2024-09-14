import * as React from "react";
import {Layout} from "@vapnik/jigsaw";

export const MainLayout: Layout = async ({Header}) => {
    return (
        <html lang="en">
    <head>
        <title>Test</title>
    </head>
    <body>
    <div>
        {Header}
    </div>
    </body>
    </html>
    )
}