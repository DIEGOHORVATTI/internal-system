import { lazy } from 'react'

const Page404 = lazy(() => import('@/pages/404'))
const Home = lazy(() => import('@/pages/home'))

export type Navigation = {
  kind: 'item' | 'header' | 'divider'
  path?: string
  component?: React.ElementType

  children?: Array<Navigation>
  title?: string
  icon?: string
  permissions?: Array<string>
}

export const navConfig: Array<Navigation> = [
  {
    kind: 'item',
    path: '*',
    component: Page404,
  },
  {
    kind: 'header',
    title: 'Main',
    children: [
      {
        kind: 'item',
        title: 'Home',
        icon: 'solar:widget-2-bold',
        path: '/',
        component: Home,
      },
      {
        kind: 'item',
        title: 'Orders',
        icon: 'solar:bag-2-bold',
        path: '/orders',
        component: Home,
        children: [
          {
            kind: 'item',
            title: 'Pending',
            icon: 'solar:clock-circle-bold',
            path: '/orders/pending',
            component: Home,
          },
          {
            kind: 'item',
            title: 'Completed',
            icon: 'solar:check-circle-bold',
            path: '/orders/completed',
            component: Home,
          },
          {
            kind: 'item',
            title: 'Returns',
            icon: 'solar:undo-left-round-bold',
            path: '/orders/returns',
            component: Home,
          },
        ],
      },
    ],
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
        component: Home,
        children: [
          {
            kind: 'item',
            title: 'List',
            icon: 'solar:list-bold',
            path: '/users/list',
            component: Home,
          },
          {
            kind: 'item',
            title: 'Create',
            icon: 'solar:add-circle-bold',
            path: '/users/create',
            component: Home,
          },
        ],
      },
      {
        kind: 'item',
        title: 'Products',
        icon: 'solar:box-bold',
        path: '/products',
        component: Home,
        children: [
          {
            kind: 'item',
            title: 'Inventory',
            icon: 'solar:archive-bold',
            path: '/products/inventory',
            component: Home,
          },
          {
            kind: 'item',
            title: 'Categories',
            icon: 'solar:layers-bold',
            path: '/products/categories',
            component: Home,
          },
        ],
      },
    ],
  },
]
