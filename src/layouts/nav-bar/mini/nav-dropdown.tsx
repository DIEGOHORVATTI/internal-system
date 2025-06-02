import type { CSSObject } from '@mui/material/styles'

import { bgBlur } from '@/theme/css'

import { styled } from '@mui/material/styles'
import Popover, { popoverClasses } from '@mui/material/Popover'

export const NavDropdown = styled(Popover)(({ open, theme }) => ({
  pointerEvents: 'none',
  [`& .${popoverClasses.paper}`]: {
    boxShadow: 'none',
    overflow: 'unset',
    padding: theme.spacing(0.5),
    ...bgBlur,
    ...(open && { pointerEvents: 'auto' }),
  } as CSSObject,
}))
