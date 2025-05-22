import { ReactNode, createContext, useState } from 'react'
import useSettings from '@/hooks/use-settings'

export type CollapseDrawerContextProps = {
  isCollapse: boolean
  collapseClick: boolean
  collapseHover: boolean
  onToggleCollapse: VoidFunction
}

const initialState: CollapseDrawerContextProps = {
  isCollapse: false,
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
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

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse,
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  )
}
