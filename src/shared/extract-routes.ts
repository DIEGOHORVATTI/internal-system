import { createElement, ReactElement } from 'react'

import type { Navigation } from '@/routes/nav-config'

type ExtractedRoute = {
  path: string
  component: ReactElement
}

export function extractRoutes(config: Navigation[]): ExtractedRoute[] {
  const routes: ExtractedRoute[] = config
    .filter((item) => item.kind === 'item' && item.path && item.component)
    .map((item) => ({
      path: item.path!,
      component: createElement(item.component!),
    }))

  return routes
}
