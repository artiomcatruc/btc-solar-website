import type { Block } from 'payload'

export const BtcStatsRow: Block = {
  slug: 'btcStatsRow',
  interfaceName: 'BtcStatsRowBlock',
  labels: { singular: 'BTC Statistics Row', plural: 'BTC Statistics Rows' },
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: {
        singular: 'Stat',
        plural: 'Statistics',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'Large number row (500+, 10 MW, …).',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Caption below the number.' },
        },
      ],
    },
    {
      name: 'preferGlobalHomeStats',
      type: 'checkbox',
      label: 'Use Home Statistics global when empty here',
      defaultValue: true,
      admin: {
        description:
          'If stats array empty, frontend will read globals/home-stats.',
      },
    },
  ],
}
