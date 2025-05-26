import { useState } from 'react'

import updateOpenMenus from '../shared/update-open-menus'
import type { NavbarVerticalProps } from '../../..'

type Props = Pick<NavbarVerticalProps, 'navConfig'> & {
  pathToParents: Record<string, Array<string>>
  currentPath: string
}

export default function useOpenMenus({ pathToParents, currentPath, navConfig }: Props) {
  const initialOpenHeaderMenus = navConfig.reduce((acc: Record<string, boolean>, item, index) => {
    const path = item.path || `header-${index}`
    acc[path] = true
    return acc
  }, {})

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    return {
      ...initialOpenHeaderMenus,
      ...updateOpenMenus(currentPath, pathToParents),
    }
  })

  const handleToggle = (path: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev?.[path],
    }))
  }

  return { openMenus, handleToggle }
}
