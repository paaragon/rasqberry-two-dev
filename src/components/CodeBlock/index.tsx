'use client'

import { ReactNode, useEffect, useRef } from 'react'

import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorState } from '@codemirror/state'
import { EditorView, drawSelection } from '@codemirror/view'
import { tags } from '@lezer/highlight'

import styles from './codeblock.module.scss'
import clsx from 'clsx'

interface Props {
    children: ReactNode
    theme?: 'light' | 'dark'
}

export function CodeBlock({ children, theme = 'dark' }: Props) {
    const code = children?.toString();
    const elRef = useRef(null)
    const viewRef = useRef<EditorView>()

    const carbonThemedHighlightStyle = HighlightStyle.define([
        { tag: tags.definitionKeyword, color: 'var(--code-constant)' },
        { tag: tags.string, color: 'var(--code-string)' },
        { tag: tags.comment, color: 'var(--code-comment)' },
        { tag: tags.keyword, color: 'var(--code-keyword)' },
        { tag: tags.operator, color: 'var(--code-punctuation)' },
        { tag: tags.number, color: 'var(--code-number)' },
        { tag: tags.link, color: 'var(--code-link)' },
        { tag: tags.function(tags.variableName), color: 'var(--code-function)' },
        { tag: tags.definition(tags.name), color: 'var(--code-function)' },
    ])

    useEffect(() => {
        if (!elRef.current) {
            return
        }

        // initializing code editor
        const state = EditorState.create({
            doc: code,
            extensions: [
                syntaxHighlighting(carbonThemedHighlightStyle),
                EditorState.readOnly.of(true),
                drawSelection({ cursorBlinkRate: 0 }),
            ],
        })

        viewRef.current = new EditorView({
            state,
            parent: elRef.current,
        })
    }, [carbonThemedHighlightStyle, code])

    const editorStyle = {
        height: 'auto',
    }

    return <div className={clsx(styles['code-block'], styles[`code-block--${theme}`])}>
        <div ref={elRef} className={styles['code-block-editor']} style={editorStyle} />
    </div>
}
