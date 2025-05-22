export type Navigation = Partial<
  {
    kind: 'header' | 'divider'
    icon: string
    title: string
    segment: string
  } & {
    children: Array<Navigation>
  }
>

export const navConfig: Array<Navigation> = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: 'mdi:menu',
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: 'mdi:shopify',
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: 'mdi:ab-testing',
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: 'mdi:sale',
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: 'mdi:traffic-cone',
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: 'mdi:layers',
  },
]
