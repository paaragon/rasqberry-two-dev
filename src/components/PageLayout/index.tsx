import { C4DTableOfContents } from "@/components/carbon-wrapper";
import { ReactElement } from "react";
import { LeadSpace, Props as LeadSpaceProps } from '@/components/LeadSpace'

import styles from './page-layout.module.scss'

interface Props {
    children: ReactElement,
    frontmatter: {
        leadspace: LeadSpaceProps
    }
}

export function PageLayout({ children, frontmatter: { leadspace } }: Props) {
    return <>
        {leadspace && <LeadSpace {...leadspace} />}
        <div className={styles['page-layout']}>
            <C4DTableOfContents>
                <div className="cds--tableofcontents__contents">
                    {children}
                </div>
            </C4DTableOfContents>
        </div>
    </>
}