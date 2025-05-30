import Iconify from '@/components/iconify'
import useSettings from '@/hooks/use-settings'
import IconButtonAnimate from '@/components/icon-button-animate'

export default function SettingsButton() {
  const { open, onToggle } = useSettings()

  return (
    <IconButtonAnimate onClick={onToggle} color={open ? 'primary' : 'default'}>
      <Iconify icon="solar:settings-bold-duotone" />
    </IconButtonAnimate>
  )
}
