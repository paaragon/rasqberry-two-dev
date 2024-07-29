'use client'

import { Code as InlineCode, monokaiSublime } from 'react-code-blocks'

interface Props {
    code: string
    theme?: 'light' | 'dark'
}

export function Code({ code, theme = 'dark' }: Props) {
    return <InlineCode
        text={code}
        language={'shell'}
        theme={monokaiSublime}
    />
}
