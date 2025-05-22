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
    title: 'Main',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: 'solar:widget-2-bold',
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: 'solar:bag-2-bold',
    children: [
      {
        segment: 'pending',
        title: 'Pending',
        icon: 'solar:clock-bold',
      },
      {
        segment: 'completed',
        title: 'Completed',
        icon: 'solar:check-circle-bold',
      },
      {
        segment: 'returns',
        title: 'Returns',
        icon: 'solar:undo-left-round-bold',
      },
    ],
  },
  {
    segment: 'products',
    title: 'Products',
    icon: 'solar:box-bold',
    children: [
      {
        segment: 'inventory',
        title: 'Inventory',
        icon: 'solar:archive-bold',
      },
      {
        segment: 'categories',
        title: 'Categories',
        icon: 'solar:layers-bold',
      },
    ],
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: 'solar:chart-square-bold',
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: 'solar:tag-price-bold',
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: 'solar:traffic-bold',
      },
      {
        segment: 'customers',
        title: 'Customers',
        icon: 'solar:users-group-rounded-bold',
      },
    ],
  },
  {
    segment: 'insights',
    title: 'Insights',
    icon: 'solar:graph-up-bold',
  },
  {
    kind: 'header',
    title: 'Management',
  },
  {
    segment: 'users',
    title: 'Users',
    icon: 'solar:user-bold',
    children: [
      {
        segment: 'list',
        title: 'User List',
        icon: 'solar:list-bold',
      },
      {
        segment: 'roles',
        title: 'Roles & Permissions',
        icon: 'solar:shield-check-bold',
      },
    ],
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: 'solar:settings-bold',
  },
  {
    segment: 'support',
    title: 'Support Center',
    icon: 'solar:lifebuoy-bold',
  },
]
