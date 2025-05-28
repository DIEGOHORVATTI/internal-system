import { m } from 'framer-motion'
import Iconify from '@/components/iconify'
import useSettings from '@/hooks/use-settings'
import { varHover } from '@/components/animate'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

export default function SettingsButton() {
  const { open, onToggle } = useSettings()

  return (
    <Box
      component={m.div}
      animate={{ rotate: [0, open ? 0 : 360] }}
      transition={{
        duration: 12,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        aria-label="settings"
        onClick={onToggle}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <Iconify icon="solar:settings-bold-duotone" />
      </IconButton>
    </Box>
  )
}
