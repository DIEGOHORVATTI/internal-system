import { useState } from 'react'

import updateOpenMenus from '../shared/update-open-menus'

export default function useOpenMenus(pathToParents: Record<string, string[]>, currentPath: string) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() =>
    updateOpenMenus(currentPath, pathToParents)
  )

  const handleToggle = (path: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev?.[path],
    }))
  }

  return { openMenus, handleToggle }
}
