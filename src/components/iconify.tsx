import type { BoxProps } from '@mui/material'
import type { IconColorTheme } from '@/theme/palette'

import { Icon } from '@iconify/react'

import Box from '@mui/material/Box'

type Props = BoxProps & {
  color?: IconColorTheme
  icon: string
  size?: number
}

export default function Iconify({ icon, size = 2, sx, ...other }: Props) {
  return (
    <Box component={Icon} icon={icon} sx={{ fontSize: `${size * 0.625}rem`, ...sx }} {...other} />
  )
}
