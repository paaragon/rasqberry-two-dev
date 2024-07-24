'use client'

import { renderToString } from "@/utils/renderToString";
import { toKebabCase } from "@/utils/toKebabCase";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export function H2({ children }: Props) {
    const title = children?.toString() || ''
    const id = toKebabCase(children?.toString() || '')

    return <>
        {/* @ts-ignore */}
        <a name={id} data-title={title}></a>
        <h2>{children}</h2>
    </>
}