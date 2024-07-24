'use client'

import { renderToString } from "@/utils/renderToString";
import { toKebabCase } from "@/utils/toKebabCase";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export function H3({ children }: Props) {
    const title = renderToString(children)
    const id = toKebabCase(title)
    console.log(id)

    return <>
        {/* @ts-ignore */}
        <a name={id} data-title={title}></a>
        <h3>{children}</h3>
    </>
}