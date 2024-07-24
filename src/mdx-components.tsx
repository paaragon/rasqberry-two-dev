import type { MDXComponents } from 'mdx/types'
import { H2 } from '@/components/Markdown/H2'
import { H3 } from '@/components/Markdown/H3'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <H2>{children}</H2>,
    h3: ({ children }) => <H3>{children}</H3>,
    ...components,
  }
}