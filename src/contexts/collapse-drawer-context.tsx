import { ReactNode, createContext, useState, useEffect } from 'react'
import useSettings from '@/hooks/use-settings'

import { useTheme } from '@mui/material'

import useMediaQuery from '@mui/material/useMediaQuery'

export type CollapseDrawerContextProps = {
  isCollapse?: boolean
  collapseClick: boolean
  collapseHover: boolean
  onToggleCollapse: VoidFunction
  onHoverEnter: VoidFunction
  onHoverLeave: VoidFunction
}

const initialState: CollapseDrawerContextProps = {
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {},
}

export const CollapseDrawerContext = createContext(initialState)

type CollapseDrawerProviderProps = {
  children: ReactNode
}

export function CollapseDrawerProvider({ children }: CollapseDrawerProviderProps) {
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const { themeLayout } = useSettings()

  const [collapse, setCollapse] = useState({
    click: themeLayout,
    hover: false,
  })

  useEffect(() => {
    if (isMobile) {
      setCollapse({
        click: false,
        hover: false,
      })
    }
  }, [isMobile])

  const onToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click })
  }

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true })
    }
  }

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false })
  }

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave,
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  )
}
