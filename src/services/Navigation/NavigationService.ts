import {Service} from "@vapnik/jigsaw";
import {headers} from "next/headers";
import {NextRequest} from "next/server";

const HEADER_URL = 'x-navigation-url'

@Service()
export class NavigationService {
    constructor() {
        this.getCurrentPath()
    }
    getCurrentPath() {
        const headersList = headers()
        return headersList.get(HEADER_URL)
    }
    static middleware(request: NextRequest, headers: Headers) {
        headers.set(HEADER_URL, request.nextUrl.pathname);
    }
    async exec(){
        this.getCurrentPath()
    }
}