'use client'
import React from "react";


export function Button() {
    const [clicked, setClicked] = React.useState(0)
    return <button onClick={() => {
        console.log(clicked)
        setClicked(clicked + 1)
    }}>
        Click Me!
    </button>
}