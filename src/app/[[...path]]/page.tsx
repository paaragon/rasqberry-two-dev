import { promises as fs } from 'fs';
import { join } from 'path'
import { PageLayout } from "@/components/PageLayout";
import { compileMDX } from 'next-mdx-remote/rsc'
import { H2 } from '@/components/Markdown/H2';
import { Ul } from '@/components/Markdown/Ul';
import { Li } from '@/components/Markdown/Li';
import { CodeBlock } from '@/components/CodeBlock';
import Children from 'react-children-utilities'

interface Props {
    params: {
        path: string[]
    }
}

export async function generateStaticParams() {
    const contentPath = join(process.cwd(), 'content')
    const content = await fs.readdir(contentPath, { withFileTypes: true, recursive: true })

    const slugs = content.filter(page => !page.isDirectory()).map(page => {
        const parentPath = page.parentPath.replace(`${contentPath}`, '')
        const slugName = page.name
            .replace('index', '')
            .replace('.md', '')
            .split('/')
        const route = `${parentPath}/${slugName}`
            .replace(/^\//, '')
            .split('/')

        return {
            path: route
        }
    })

    return slugs
}

export default async function Page({ params }: Props) {
    const path = params.path || ['index']
    const file = await fs.readFile(join(process.cwd(), 'content', `${path.join('/')}.md`), 'utf8');

    const { content, frontmatter } = await compileMDX({
        source: file,
        options: { parseFrontmatter: true },
        components: {
            h2: ({ children }) => <H2>{children}</H2>,
            pre: ({ children }) => <CodeBlock>{Children.onlyText(children)}</CodeBlock>,
            ul: ({ children }) => <Ul>{children}</Ul>,
            li: ({ children }) => <Li>{children}</Li>,
        }
    })

    return <PageLayout frontmatter={frontmatter}>
        {content}
    </PageLayout>
}