import Iconify from '@/components/iconify'
import useSettings from '@/hooks/use-settings'

import IconButton from '@mui/material/IconButton'

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
      <IconButton onClick={settings.onToggle} color={settings.open ? 'primary' : 'inherit'}>
        <Iconify icon="solar:settings-bold-duotone" />
      </IconButton>
    </ButtonCollapse>
  )
}
