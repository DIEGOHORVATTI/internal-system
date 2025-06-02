import { lazy } from 'react'

import { PATHS } from './paths'

const Login = lazy(() => import('@/features/auth/pages/login'))
const Page404 = lazy(() => import('@/features/error/pages/404'))
const Home = lazy(() => import('@/features/home/pages/home'))
const FileManagePage = lazy(() => import('@/features/file-manager/pages/file-manager-page'))
const PostListView = lazy(() => import('@/features/blog/pages/post-list-view'))

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
    kind: 'item',
    title: 'Home',
    icon: 'solar:home-bold',
    path: PATHS.home,
    component: PostListView,
  },
  {
    kind: 'item',
    icon: 'solar:file-bold',
    title: 'Arquivos',
    path: PATHS.fileManager.root,
    component: FileManagePage,
  },
  {
    kind: 'header',
    title: 'Postagens',
    icon: 'solar:note-bold',
    children: [
      {
        kind: 'item',
        title: 'Listagem',
        icon: 'solar:widget-home-bold',
        path: PATHS.post.list,
        component: PostListView,
      },
    ],
  },
]
