import { createContext, useMemo } from 'react'

import { useLocalStorage } from '@/hooks/use-local-storage'

import { STORAGE_KEYS } from '@/constants/config'

import { COMMON } from '@/theme/palette'

type ISettingsValue = {
  themeStretch: boolean
  themeMode: 'light' | 'dark'
  themeContrast: 'default' | 'bold'
  modeLayout: boolean
  themeColorPresets: keyof typeof COMMON
}

export type ISettings = ISettingsValue & {
  onUpdate: (value: ISettingsValue) => void
  onToggleMode: VoidFunction
  onToggleModeLayout: VoidFunction
  onPresetsChange: (value: ISettingsValue['themeColorPresets']) => void
}

type Props = {
  children: React.ReactNode
  defaultSettings: ISettingsValue
}

export const SettingsContext = createContext({} as ISettings)

export default function SettingsProvider({ children, defaultSettings }: Props) {
  const { state, update } = useLocalStorage<ISettingsValue>(STORAGE_KEYS.SETTINGS, defaultSettings)

  const onToggleMode = () =>
    update({ ...state, themeMode: state.themeMode === 'light' ? 'dark' : 'light' })

  const onToggleModeLayout = () => update({ ...state, modeLayout: !state.modeLayout })

  const onPresetsChange = (themeColorPresets: ISettingsValue['themeColorPresets']) =>
    update({ ...state, themeColorPresets })

  const memoizedValue = useMemo<ISettings>(
    () => ({
      ...state,
      onToggleMode,
      onToggleModeLayout,
      onPresetsChange,
      onUpdate: update,
    }),
    [update, state]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}
