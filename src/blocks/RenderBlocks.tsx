import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BtcAboutHeroBlockComponent } from '@/blocks/BtcAboutHero/Component'
import { BtcBenefitsSplitBlockComponent } from '@/blocks/BtcBenefitsSplit/Component'
import { BtcContactSectionComponent } from '@/blocks/BtcContactSection/Component'
import { BtcCtaBannerBlockComponent } from '@/blocks/BtcCtaBanner/Component'
import { BtcFaqAccordionBlockComponent } from '@/blocks/BtcFaqAccordion/Component'
import { BtcGalleryGridBlockComponent } from '@/blocks/BtcGalleryGrid/Component'
import { BtcHeroBlockComponent } from '@/blocks/BtcHero/Component'
import { BtcProcessStepsBlockComponent } from '@/blocks/BtcProcessSteps/Component'
import { BtcSectionIntroBlockComponent } from '@/blocks/BtcSectionIntro/Component'
import { BtcServicesGridBlockComponent } from '@/blocks/BtcServicesGrid/Component'
import { BtcStatsRowComponent } from '@/blocks/BtcStatsRow/Component'
import { BtcTestimonialsGridBlockComponent } from '@/blocks/BtcTestimonialsGrid/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

type Layout = Page['layout']

export async function RenderBlocks({ blocks }: { blocks: Layout }) {
  if (!blocks?.length) return null

  const rendered: React.ReactNode[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]

    if (!block?.blockType) continue

    const stableKey = `${block.blockType}-${index}-${
      'id' in block && typeof block.id === 'string' ? block.id : 'row'
    }`

    const previousBlock = index > 0 ? blocks[index - 1] : null
    const nextBlock = index < blocks.length - 1 ? blocks[index + 1] : null
    const pairsWithServicesGrid =
      block.blockType === 'btcSectionIntro' && nextBlock?.blockType === 'btcServicesGrid'
    const followsSectionIntro =
      block.blockType === 'btcServicesGrid' && previousBlock?.blockType === 'btcSectionIntro'
    const skipMargin = block.blockType === 'btcHero' || pairsWithServicesGrid || followsSectionIntro

    const addSection = (node: React.ReactNode) => {
      if (skipMargin) {
        rendered.push(<Fragment key={stableKey}>{node}</Fragment>)
      } else {
        rendered.push(<div key={stableKey}>{node}</div>)
      }
    }

    if (block.blockType === 'btcHero') {
      addSection(<BtcHeroBlockComponent {...block} />)
      continue
    }

    if (block.blockType === 'btcAboutHero') {
      addSection(<BtcAboutHeroBlockComponent {...block} />)
      continue
    }

    if (block.blockType === 'btcSectionIntro') {
      addSection(
        <BtcSectionIntroBlockComponent
          {...block}
          continuesToServicesGrid={pairsWithServicesGrid}
        />,
      )
      continue
    }

    if (block.blockType === 'btcServicesGrid') {
      addSection(
        <BtcServicesGridBlockComponent {...block} followsSectionIntro={followsSectionIntro} />,
      )
      continue
    }

    if (block.blockType === 'btcBenefitsSplit') {
      addSection(<BtcBenefitsSplitBlockComponent {...block} />)
      continue
    }

    if (block.blockType === 'btcProcessSteps') {
      addSection(<BtcProcessStepsBlockComponent {...block} />)
      continue
    }

    if (block.blockType === 'btcStatsRow') {
      addSection(<BtcStatsRowComponent {...block} />)
      continue
    }

    if (block.blockType === 'btcTestimonialsGrid') {
      addSection(<BtcTestimonialsGridBlockComponent {...block} />)
      continue
    }

    if (block.blockType === 'btcFaqAccordion') {
      addSection(<BtcFaqAccordionBlockComponent {...block} />)
      continue
    }

    if (block.blockType === 'btcCtaBanner') {
      addSection(<BtcCtaBannerBlockComponent {...block} />)
      continue
    }

    if (block.blockType === 'btcGalleryGrid') {
      addSection(<BtcGalleryGridBlockComponent {...block} />)
      continue
    }

    if (block.blockType === 'btcContactSection') {
      addSection(<BtcContactSectionComponent {...block} />)
      continue
    }

    if (block.blockType === 'cta') {
      addSection(<CallToActionBlock {...block} disableInnerContainer />)
      continue
    }

    if (block.blockType === 'content') {
      addSection(<ContentBlock {...block} disableInnerContainer />)
      continue
    }

    if (block.blockType === 'mediaBlock') {
      addSection(<MediaBlock {...block} disableInnerContainer />)
      continue
    }

    if (block.blockType === 'archive') {
      addSection(
        <ArchiveBlock
          {...block}
          disableInnerContainer
          id={typeof block.id === 'string' ? block.id : undefined}
        />,
      )
      continue
    }

    if (block.blockType === 'formBlock') {
      addSection(
        <FormBlock
          {...block}
          disableInnerContainer
          id={typeof block.id === 'string' ? block.id : undefined}
        />,
      )
      continue
    }
  }

  return <Fragment>{rendered}</Fragment>
}
