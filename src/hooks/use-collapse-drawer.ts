import { useContext } from 'react'

import { CollapseDrawerContext } from '@/contexts/collapse-drawer-context'

export default function useCollapseDrawer() {
  const context = useContext(CollapseDrawerContext)

  if (!context) throw new Error('useCollapseDrawer must be use inside SettingsProvider')

  return context
}
