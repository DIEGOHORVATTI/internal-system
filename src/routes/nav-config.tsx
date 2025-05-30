import { lazy } from 'react'

import { PATHS } from './paths'

const Login = lazy(() => import('@/features/auth/pages/login'))
const Page404 = lazy(() => import('@/features/error/pages/404'))
const Home = lazy(() => import('@/features/home/pages/home'))

export type Navigation = {
  kind: 'item' | 'header' | 'divider' | 'hidden'
  path?: string
  component?: React.ElementType

  children?: Array<Navigation>
  title?: string
  icon?: string
  permissions?: Array<string>
}

export const navConfig: Array<Navigation> = [
  {
    kind: 'hidden',
    path: '*',
    component: Page404,
  },
  {
    kind: 'hidden',
    path: PATHS.auth.login,
    component: Login,
  },
  {
    kind: 'header',
    title: 'Main',
    icon: 'solar:home-bold',
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
    icon: 'solar:settings-bold',
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
