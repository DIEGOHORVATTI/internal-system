import Iconify from '@/components/iconify'
import useSettings from '@/hooks/use-settings'

import ButtonCollapse from '../button-collapse'
import SettingsDrawer from './components/settings-drawer'

type Props = {
  open: boolean
}

export default function SettingsPopover({ open }: Props) {
  const settings = useSettings()

  return (
    <>
      <ButtonCollapse
        open={open}
        active={settings.open}
        onClick={settings.onToggle}
        slotProps={{
          listItemText: {
            secondary: 'Configurações',
          },
        }}
      >
        <Iconify icon="solar:settings-bold-duotone" />
      </ButtonCollapse>

      <SettingsDrawer />
    </>
  )
}
