import Iconify from '@/components/iconify'
import useSettings from '@/hooks/use-settings'

import ButtonCollapse from './button-collapse'

type Props = {
  open: boolean
}

export default function SettingsButton({ open }: Props) {
  const settings = useSettings()

  return (
    <ButtonCollapse
      open={open}
      active={settings.open}
      onClick={settings.onToggle}
      slotProps={{
        listItemText: {
          primary: 'Configurações',
        },
      }}
    >
      <Iconify icon="solar:settings-bold-duotone" size={2.8} />
    </ButtonCollapse>
  )
}
