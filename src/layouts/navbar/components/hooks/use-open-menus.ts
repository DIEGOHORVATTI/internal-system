import { useState } from 'react'

import updateOpenMenus from '../shared/update-open-menus'

import type { NavbarVerticalProps } from '../..'

type Props = Pick<NavbarVerticalProps, 'navConfig'> & {
  pathToParents: Record<string, Array<string>>
  currentPath: string
}

export default function useOpenMenus({ pathToParents, currentPath, navConfig }: Props) {
  const initialOpenHeaderMenus = navConfig.reduce((acc: Record<string, boolean>, item, index) => {
    const { key } = extractKey(item.path, index)
    acc[key] = true

    return acc
  }, {})

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => ({
    ...initialOpenHeaderMenus,
    ...updateOpenMenus(currentPath, pathToParents),
  }))

  const handleToggle = (path: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev?.[path],
    }))
  }

  return { openMenus, handleToggle, extractKey }
}

function extractKey(path: string | undefined, index: number) {
  return { key: path || `header-${index}` }
}
