import {Widget} from "@vapnik/jigsaw";
import * as React from "react";
import logo from './logo.svg'
import Image from "next/image";

import './style.scss'

@Widget('Header')
export class Header {

    constructor() {
    }

    async resolve() {
        console.log('render header')
        return <header className="header">
            <div className="logo">
                <Image src={logo} alt={'Jigsaw'} height={100}/>
            </div>
        </header>
    }
}