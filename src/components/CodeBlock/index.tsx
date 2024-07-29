'use client'

import { CopyBlock, monokai } from 'react-code-blocks'

interface Props {
    code: string
    theme?: 'light' | 'dark'
}

export function CodeBlock({ code, theme = 'dark' }: Props) {
    return <CopyBlock
        text={code}
        language={'shell'}
        showLineNumbers={false}
        copied={true}
        theme={monokai}
        codeBlock={true}
        customStyle={{
            border: 'none'
        }}
    />
}
