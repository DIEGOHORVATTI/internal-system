import type { ISettings, SettingsValueProps } from '@/layouts/components/settings-popover/types'

import isEqual from 'lodash/isEqual'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useMemo, useState, useCallback, createContext } from 'react'

import { LOCAL_STORAGE } from '../constants/config'

type SettingsProviderProps = {
  children: React.ReactNode
  defaultSettings: SettingsValueProps
}

export const SettingsContext = createContext({} as ISettings)

export default function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(LOCAL_STORAGE.SETTINGS, defaultSettings)

  const [openDrawer, setOpenDrawer] = useState(false)

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false)
  }, [])

  const onToggleLayot = useCallback(
    (themeLayout: SettingsValueProps['themeLayout']) => update({ ...state, themeLayout }),
    [state, update]
  )

  const onUpdate = useCallback(
    (name: keyof SettingsValueProps, value: SettingsValueProps[keyof SettingsValueProps]) => {
      update({
        ...state,
        [name]: value,
      })
    },
    [update, state]
  )

  const canReset = !isEqual(state, defaultSettings)

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate,

      onToggleLayot,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [state, onUpdate, canReset, reset, openDrawer, onToggleLayot, onToggleDrawer, onCloseDrawer]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}
