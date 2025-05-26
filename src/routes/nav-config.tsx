export type Navigation = {
  kind: 'item' | 'header' | 'divider'
  title?: string
  icon?: string
  children?: Array<Navigation>
  path?: string
}

export const navConfig: Array<Navigation> = [
  {
    kind: 'header',
    title: 'Main',
    children: [
      {
        kind: 'item',
        title: 'Dashboard',
        icon: 'solar:widget-2-bold',
        path: '/dashboard',
      },
      {
        kind: 'item',
        title: 'Orders',
        icon: 'solar:bag-2-bold',
        path: '/orders',
        children: [
          {
            kind: 'item',
            title: 'Pending',
            icon: 'solar:clock-circle-bold',
            path: '/orders/pending',
          },
          {
            kind: 'item',
            title: 'Completed',
            icon: 'solar:check-circle-bold',
            path: '/orders/completed',
          },
          {
            kind: 'item',
            title: 'Returns',
            icon: 'solar:undo-left-round-bold',
            path: '/orders/returns',
          },
        ],
      },
    ],
  },
]
