import type { Navigation } from '@/routes/nav-config'
import type { PathRouteProps } from 'react-router-dom'

import { createElement } from 'react'

export default function extractRoutes(config: Navigation[]) {
  const routes: Array<Pick<PathRouteProps, 'path' | 'element'>> = []

  const traverse = (items: Navigation[]) => {
    for (const item of items) {
      if (item.path && item.component) {
        routes.push({
          path: item.path,
          element: createElement(item.component),
        })
      }

      if (item.children) {
        traverse(item.children)
      }
    }
  }

  traverse(config)

  return routes
}
