export type Navigation = {
  kind: 'item' | 'header' | 'divider'
  title?: string
  segment?: string
  icon?: string
  children?: Array<Navigation>
  path?: string
}

export const navConfig: Array<Navigation> = [
  {
    kind: 'header',
    title: 'Main',
    segment: 'main-header',
    children: [
      {
        kind: 'item',
        segment: 'dashboard',
        title: 'Dashboard',
        icon: 'solar:widget-2-bold',
        path: '/dashboard',
      },
      {
        kind: 'item',
        segment: 'orders',
        title: 'Orders',
        icon: 'solar:bag-2-bold',
        children: [
          {
            kind: 'item',
            segment: 'pending',
            title: 'Pending',
            icon: 'solar:clock-circle-bold',
            path: '/orders/pending',
          },
          {
            kind: 'item',
            segment: 'completed',
            title: 'Completed',
            icon: 'solar:check-circle-bold',
            path: '/orders/completed',
          },
          {
            kind: 'item',
            segment: 'returns',
            title: 'Returns',
            icon: 'solar:undo-left-round-bold',
            path: '/orders/returns',
          },
        ],
      },
      {
        kind: 'item',
        segment: 'products',
        title: 'Products',
        icon: 'solar:box-bold',
        children: [
          {
            kind: 'item',
            segment: 'inventory',
            title: 'Inventory',
            icon: 'solar:archive-bold',
            path: '/products/inventory',
          },
          {
            kind: 'item',
            segment: 'categories',
            title: 'Categories',
            icon: 'solar:layers-bold',
            path: '/products/categories',
          },
        ],
      },
    ],
  },
  {
    kind: 'header',
    title: 'Analytics',
    segment: 'analytics-header',
    children: [
      {
        kind: 'item',
        segment: 'reports',
        title: 'Reports',
        icon: 'solar:chart-square-bold',
        children: [
          {
            kind: 'item',
            segment: 'sales',
            title: 'Sales',
            icon: 'solar:tag-price-bold',
            path: '/reports/sales',
          },
          {
            kind: 'item',
            segment: 'traffic',
            title: 'Traffic',
            icon: 'solar:traffic-bold',
            path: '/reports/traffic',
          },
          {
            kind: 'item',
            segment: 'customers',
            title: 'Customers',
            icon: 'solar:users-group-rounded-bold',
            path: '/reports/customers',
          },
        ],
      },
      {
        kind: 'item',
        segment: 'insights',
        title: 'Insights',
        icon: 'solar:graph-up-bold',
        path: '/insights',
      },
    ],
  },
  {
    kind: 'header',
    title: 'Management',
    segment: 'management-header',
    children: [
      {
        kind: 'item',
        segment: 'users',
        title: 'Users',
        icon: 'solar:user-bold',
        children: [
          {
            kind: 'item',
            segment: 'list',
            title: 'User List',
            icon: 'solar:list-bold',
            path: '/users/list',
          },
          {
            kind: 'item',
            segment: 'roles',
            title: 'Roles & Permissions',
            icon: 'solar:shield-check-bold',
            path: '/users/roles',
          },
        ],
      },
      {
        kind: 'item',
        segment: 'settings',
        title: 'Settings',
        icon: 'solar:settings-bold',
        path: '/settings',
      },
      {
        kind: 'item',
        segment: 'support',
        title: 'Support Center',
        icon: 'solar:lifebuoy-bold',
        path: '/support',
      },
    ],
  },
]
