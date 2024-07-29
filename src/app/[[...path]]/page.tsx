import { promises as fs } from 'fs';
import { join } from 'path'
import { FrontMatter, PageLayout } from "@/components/PageLayout";
import { compileMDX } from 'next-mdx-remote/rsc'
import { H2 } from '@/components/Markdown/H2';
import { Ul } from '@/components/Markdown/Ul';
import { Li } from '@/components/Markdown/Li';
import { CodeBlock } from '@/components/CodeBlock';
import Children from 'react-children-utilities'
import { Code } from '@/components/Code';
import { NavItem } from '@/components/HeaderNav';
import { fromKebabToHuman } from '@/utils/fromKebabToHuman';
import { extractH2FromMd } from '@/utils/extractH2FromMd';

interface Props {
    params: {
        path: string[]
    }
}

const contentPath = join('content')

export async function generateStaticParams() {
    const paths = await getPaths(contentPath)

    return paths.map(path => ({ path: path.path.map(p => p.toLowerCase()) }))
}

export default async function Page({ params }: Props) {
    const path = params.path || ['index']
    const file = await fs.readFile(join(contentPath, `${path.join('/')}.md`), 'utf8');
    const navItems = await getNavItems()

    const { content, frontmatter } = await compileMDX({
        source: file,
        options: { parseFrontmatter: true },
        components: {
            h2: ({ children }) => <H2>{children}</H2>,
            pre: ({ children }) => <CodeBlock code={Children.onlyText(children)} />,
            code: ({ children }) => <Code code={Children.onlyText(children)} />,
            ul: ({ children }) => <Ul>{children}</Ul>,
            li: ({ children }) => <Li>{children}</Li>,
        }
    })

    let tocItems: string[] = []
    if (frontmatter.tableofcontent !== false) {
        tocItems = extractH2FromMd(file)
    }

    return <PageLayout frontmatter={{ ...frontmatter, tableofcontent: { items: tocItems } }} navItems={navItems}>
        {content}
    </PageLayout>
}

async function getNavItems(): Promise<NavItem[]> {
    const paths = await getPaths(contentPath)
    const navItems: NavItem[] = []
    for (const path of paths) {
        addPathsToNavItems(navItems, path)
    }

    return navItems
}

function addPathsToNavItems(navItems: NavItem[], paths: { path: string[] }, level: number = 0) {
    const { path } = paths
    const humanReadableLabel = fromKebabToHuman(path[level])
    const root = navItems.find(item => item.label === humanReadableLabel)
    if (root !== undefined) {
        addPathsToNavItems(root.children, paths, level + 1)

        return
    }

    navItems.push({ label: humanReadableLabel || 'Home', url: `/${path.join('/').toLowerCase()}`, children: [] })
}

async function getPaths(contentPath: string): Promise<{ path: string[] }[]> {
    const content = await fs.readdir(contentPath, { withFileTypes: true, recursive: true })

    const paths = content.filter(page => !page.isDirectory()).map(page => {
        const parentPath = page.parentPath.replace(`${contentPath}`, '')
        const slugName = page.name
            .replace('index', '')
            .replace('.md', '')
            .split('/')
        const route = `${parentPath}/${slugName}`
            .replace(/^\//, '')
            .split('/')

        return {
            path: route,
        }
    })

    return paths
}