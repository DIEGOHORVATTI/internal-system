import { useContext } from 'react'
import { CollapseDrawerContext } from '@/contexts/collapse-drawer-context'

export const useCollapseDrawer = () => useContext(CollapseDrawerContext)
