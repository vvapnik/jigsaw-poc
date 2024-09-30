import {Widget} from "@vapnik/jigsaw";
import * as React from "react";
import {NavigationService} from "@/services/Navigation/NavigationService";

@Widget()
export class PageHead {
    constructor(private navigationService: NavigationService) {
    }

    async resolve() {
        const {} = this.navigationService.getCurrentPage()
        return (
            <head>
                <title>Test</title>
            </head>
        )
    }
}