import Iconify from '@/components/iconify'

export type Navigation = Partial<
  {
    kind: 'header' | 'divider'
    icon: React.ReactNode
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
    icon: <Iconify icon="mdi:menu" />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <Iconify icon="mdi:shopify" />,
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
    icon: <Iconify icon="mdi:ab-testing" />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <Iconify icon="mdi:sale" />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <Iconify icon="mdi:traffic-cone" />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <Iconify icon="mdi:layers" />,
  },
]
