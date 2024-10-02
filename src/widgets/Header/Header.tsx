import {Widget} from "@vapnik/jigsaw";
import * as React from "react";
import logo from './logo.svg'
import Image from "next/image";

import './style.scss'
import {Navigation} from "@/widgets/Header/Navigation/Navigation";
import {NavigationService} from "@/services/Navigation/NavigationService";
import Link from "next/link";

@Widget('Header')
export class Header {

    constructor(private navigation: NavigationService) {
    }

    async resolve() {
        console.log('render header')
        return <header className="header">
            <div className="logo">
                <Link href={'/'}>
                    <Image src={logo} alt={'Jigsaw'} height={100}/>
                </Link>
            </div>
            <Navigation pages={this.navigation.getPagesList()} active={this.navigation.getCurrentPath()}/>
        </header>
    }
}