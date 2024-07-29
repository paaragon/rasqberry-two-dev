import { ReactElement, useState } from "react";
import { LeadSpace, Props as LeadSpaceProps } from '@/components/LeadSpace'

import styles from './page-layout.module.scss'
import { Column, Grid } from "@/components/carbon-wrapper";
import { TableOfContent, Props as TableOfContentProps } from "@/components/TableOfContent";

interface Props {
    children: ReactElement,
    frontmatter?: {
        leadspace?: LeadSpaceProps
        tableofcontent?: TableOfContentProps
    }
}

export function PageLayout({ children, frontmatter: { leadspace, tableofcontent } = {} }: Props) {
    return <>
        {leadspace && <LeadSpace {...leadspace} />}
        <Grid className={styles['page-layout__main']}>
            <Column sm="100%">
                <Grid>
                    {tableofcontent && <>
                        <Column sm={4} md={8} lg={4}>
                            <TableOfContent {...tableofcontent} />
                        </Column>
                        <Column sm={4} lg={1} />
                    </>
                    }
                    <Column sm="100%" lg={10} className="main-content">
                        {children}
                    </Column>
                </Grid>
            </Column>
        </Grid>
    </>
}