import type { COMMON } from '@/theme/palette'

export type SettingsValueProps = {
  themeStretch: boolean
  themeMode: 'light' | 'dark'
  themeContrast: 'default' | 'bold'
  themeLayout: 'vertical' | 'horizontal' | 'mini'
  themeColorPresets: keyof typeof COMMON
}

export type ISettings = SettingsValueProps & {
  onUpdate: (name: string, value: string | boolean) => void

  canReset: boolean
  onReset: VoidFunction

  onToggleLayot: (themeLayout: SettingsValueProps['themeLayout']) => void
  onPresetsChange: (themeColorPresets: SettingsValueProps['themeColorPresets']) => void
  onToggleMode: VoidFunction

  open: boolean
  onToggle: VoidFunction
  onClose: VoidFunction
}
