import {Page} from "@/services/Navigation/NavigationService";
import {FC} from "react";

import './index.scss'
import Link from "next/link";

export type NavigationProps = {
    pages: Page[],
    active: string
}
export const Navigation: FC<NavigationProps> = ({pages, active}) => {
    return (
        <nav className="navigation">
            {pages.map(page => <Link className={active === page.url?'active link':'link'} href={page.url} key={page.name}>{page.name}</Link>)}
        </nav>
    )
}