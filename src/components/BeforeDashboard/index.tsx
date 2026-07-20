import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const seedEnabled = process.env.ENABLE_SEED === 'true'

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your dashboard!</h4>
      </Banner>
      {seedEnabled ? (
        <>
          Here&apos;s what to do next:
          <ul className={`${baseClass}__instructions`}>
            <li>
              <SeedButton />
              {' with a few pages, posts, and projects to jump-start your new site, then '}
              <a href="/" target="_blank">
                visit your website
              </a>
              {' to see the results.'}
            </li>
            <li>
              Seed wipes products, orders, pages, media, and more. Only enable via{' '}
              <code>ENABLE_SEED=true</code> on non-production environments.
            </li>
          </ul>
        </>
      ) : (
        <p>
          Manage content from the collections in the sidebar. Database seeding is disabled on this
          environment.
        </p>
      )}
    </div>
  )
}

export default BeforeDashboard
