import { ReactNode, createContext, useState } from 'react'
import useSettings from '@/hooks/use-settings'

export type CollapseDrawerContextProps = {
  isCollapse: boolean
  collapseClick: boolean
  collapseHover: boolean
  onToggleCollapse: VoidFunction
  onHoverEnter: VoidFunction
  onHoverLeave: VoidFunction
}

const initialState: CollapseDrawerContextProps = {
  isCollapse: false,
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
  const { themeLayout, onToggleLayout } = useSettings()

  const [collapse, setCollapse] = useState({
    click: themeLayout,
    hover: false,
  })

  const onToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click })
    onToggleLayout()
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
