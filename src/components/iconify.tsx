'use client'

import type { BoxProps } from '@mui/material'
import type { IconifyIcon } from '@iconify/react'
import type { IconColorTheme } from '@/theme/palette'

import { Icon, iconExists } from '@iconify/react'

import Box from '@mui/material/Box'

type Props = BoxProps & {
  color?: IconColorTheme
  icon: IconifyIcon | string | undefined
  size?: number
}

const fallbackIcon = (icon: Props['icon']) => {
  if (typeof icon !== 'string' || iconExists(icon)) {
    return icon
  }

  return icon.replace('fa6-solid:', 'fa-solid:')
}

export default function Iconify({ icon, size = 2, sx, ...other }: Props) {
  return (
    <Box
      component={Icon}
      icon={fallbackIcon(icon)}
      sx={{ fontSize: `${size * 0.625}rem`, ...sx }}
      {...other}
    />
  )
}
