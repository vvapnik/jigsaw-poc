import * as React from "react";
import {FC, ReactNode} from "react";

export type LayoutTemplateProps = {
    widgets: Record<string, ReactNode>,
    children: ReactNode
}
export const CommonLayoutTemplate: FC<LayoutTemplateProps> = ({widgets: {Header, PageHead}, children}) => {
    return (
        <html lang="en">
        {PageHead}
        <body>
        <div>
            {Header}
        </div>
        <>{children}</>
        </body>
        </html>
    )
}