import type { BoxProps } from '@mui/material';
import type { IconifyIcon } from '@iconify/react';

import { Icon } from '@iconify/react'

import { Box } from '@mui/material'

interface Props extends BoxProps {
  icon?: IconifyIcon | string
  size?: number
  name?: string
}

export default function Iconify({ icon, size = 2, sx, name, ...other }: Props) {
  return <Box component={Icon} icon={icon} sx={{ ...sx, fontSize: size * 10 }} {...other} />
}
