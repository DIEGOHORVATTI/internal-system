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
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Management',
    children: [
      {
        kind: 'item',
        title: 'Users',
        icon: 'solar:user-bold',
        path: '/users',
        children: [
          {
            kind: 'item',
            title: 'List',
            icon: 'solar:list-bold',
            path: '/users/list',
          },
          {
            kind: 'item',
            title: 'Create',
            icon: 'solar:add-circle-bold',
            path: '/users/create',
          },
        ],
      },
      {
        kind: 'item',
        title: 'Products',
        icon: 'solar:box-bold',
        path: '/products',
        children: [
          {
            kind: 'item',
            title: 'Inventory',
            icon: 'solar:archive-bold',
            path: '/products/inventory',
          },
          {
            kind: 'item',
            title: 'Categories',
            icon: 'solar:layers-bold',
            path: '/products/categories',
          },
        ],
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Reports',
    children: [
      {
        kind: 'item',
        title: 'Sales',
        icon: 'solar:graph-up-bold',
        path: '/reports/sales',
      },
      {
        kind: 'item',
        title: 'Customers',
        icon: 'solar:users-group-rounded-bold',
        path: '/reports/customers',
      },
      {
        kind: 'item',
        title: 'Performance',
        icon: 'solar:activity-bold',
        path: '/reports/performance',
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Settings',
    children: [
      {
        kind: 'item',
        title: 'General',
        icon: 'solar:settings-bold',
        path: '/settings/general',
      },
      {
        kind: 'item',
        title: 'Notifications',
        icon: 'solar:bell-bold',
        path: '/settings/notifications',
      },
      {
        kind: 'item',
        title: 'Billing',
        icon: 'solar:credit-card-bold',
        path: '/settings/billing',
      },
    ],
  },
]
