import { useContext } from 'react'
import { SettingsContext } from '@/contexts/settings-provider'

export default function useSettings() {
  const context = useContext(SettingsContext)

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider')

  return context
}
