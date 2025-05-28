import type { ISettings, SettingsValueProps } from '@/components/settings/types'

import isEqual from 'lodash/isEqual'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useMemo, useState, useCallback, createContext } from 'react'

import { LOCAL_STORAGE } from '../config'

type SettingsProviderProps = {
  children: React.ReactNode
  defaultSettings: SettingsValueProps
}

export const SettingsContext = createContext({} as ISettings)

export default function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(LOCAL_STORAGE.SETTINGS, defaultSettings)

  console.log(state.themeLayout)

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

  const onToggleMode = useCallback(
    () => update({ ...state, themeMode: state.themeMode === 'light' ? 'dark' : 'light' }),
    [state, update]
  )

  const onPresetsChange = useCallback(
    (themeColorPresets: SettingsValueProps['themeColorPresets']) =>
      update({ ...state, themeColorPresets }),
    [state, update]
  )

  const onUpdate = useCallback(
    (name: string, value: string | boolean) => {
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
      // Settings Theme
      onPresetsChange,
      onToggleMode,
      onToggleLayot,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [
      state,
      onUpdate,
      canReset,
      reset,
      openDrawer,
      onToggleLayot,
      onPresetsChange,
      onToggleDrawer,
      onCloseDrawer,
      onToggleMode,
    ]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}
