import {Widget} from "@vapnik/jigsaw";
import * as React from "react";
import {NavigationService} from "@/services/Navigation/NavigationService";

@Widget('PageHead')
export class PageHead {
    constructor(private navigationService: NavigationService) {
    }

    async resolve() {
        const {name} = this.navigationService.getCurrentPage()
        return (
            <head>
                <title>{name + ' | Jigsaw'}</title>
            </head>
        )
    }
}