import {Widget} from "@vapnik/jigsaw";
import * as React from "react";
import {PageService} from "@/services/Page/PageService";

@Widget()
export class Header {

    constructor(private pageService: PageService) {
    }

    async resolve() {
        const page = this.pageService.getCurrentPage()
        return <div>
            <h1>{page.name}</h1>
        </div>
    }
}