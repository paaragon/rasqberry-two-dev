import { ReactElement } from "react";
import { C4DBackgroundMedia, C4DButtonGroup, C4DButtonGroupItem, C4DLeadspace, C4DLeadspaceHeading } from "@/components/carbon-wrapper";
import React from "react";

import styles from './lead-space.module.scss'
import { ArrowRight } from "@carbon/icons-react";

export interface Props {
    title?: string
    type?: 'left' | 'small' | 'centered'
    size?: 'short' | 'medium' | 'tall' | 'super'
    copy?: string
    cta?: {
        primary: {
            label: string
            url: string
            icon?: ReactElement
        },
        secondary?: {
            label: string
            url: string
            icon?: ReactElement
        },
    }
    bg?: {
        image: {
            src: string
            alt: string
        }
    }
}


export function LeadSpace({ title, copy, cta, bg, type = 'left', size = 'tall' }: Props) {
    const primaryIcon = cta?.primary.icon ? React.cloneElement(cta?.primary.icon, {
        slot: 'icon'
        // @ts-ignore
    }) : <ArrowRight slot="icon" />
    const secondaryIcon = cta?.secondary?.icon ? React.cloneElement(cta?.secondary?.icon, {
        slot: 'icon'
        // @ts-ignore
    }) : <ArrowRight slot="icon" />

    return <div className={styles['lead-space']}>
        <C4DLeadspace size={size} type={type}>
            <C4DLeadspaceHeading>{title}</C4DLeadspaceHeading>
            {copy}
            {cta && <C4DButtonGroup slot="action">
                <C4DButtonGroupItem href={cta.primary.url}>
                    {primaryIcon}
                    {cta.primary.label}
                </C4DButtonGroupItem>
                {cta.secondary && <C4DButtonGroupItem href={cta.secondary.url}>
                    {secondaryIcon}
                    {cta.secondary.label}
                </C4DButtonGroupItem>}
            </C4DButtonGroup>
            }
        </C4DLeadspace>
        {
            bg && <div className={styles['lead-space__bg']}>
                <C4DBackgroundMedia
                    default-src={bg.image.src}
                    alt={bg.image.alt}
                    opacity="100">
                </C4DBackgroundMedia>
            </div>
        }
    </div>
}