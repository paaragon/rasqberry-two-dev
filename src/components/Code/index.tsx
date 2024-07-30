'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface Props {
    code: string
    theme?: 'light' | 'dark'
}

export function Code({ code, theme = 'dark' }: Props) {
    return <SyntaxHighlighter language="bash" style={dark} PreTag={"code"} CodeTag={"span"} customStyle={{
        display: "inline-block",
        padding: "0.25rem",
        lineHeight: "1.25rem",
        marginBottom: "-0.5rem",
    }}>
        {code}
    </SyntaxHighlighter>
}
