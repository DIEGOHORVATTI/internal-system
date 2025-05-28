import type { COMMON } from '@/theme/palette'

export type SettingsValueProps = {
  themeStretch: boolean
  themeMode: 'light' | 'dark'
  themeContrast: 'default' | 'bold'
  themeLayout: 'vertical' | 'horizontal' | 'mini'
  themeColorPresets: keyof typeof COMMON
}

export type ISettings = SettingsValueProps & {
  onUpdate: (
    name: keyof SettingsValueProps,
    value: SettingsValueProps[keyof SettingsValueProps]
  ) => void

  canReset: boolean
  onReset: VoidFunction

  onToggleLayot: (themeLayout: SettingsValueProps['themeLayout']) => void

  open: boolean
  onToggle: VoidFunction
  onClose: VoidFunction
}
