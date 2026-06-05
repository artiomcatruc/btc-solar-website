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
            description: 'Number plus suffix, e.g. 500+, 10MW, 98% — suffix renders in solar accent.',
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
