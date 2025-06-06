import type { Theme } from '@mui/material/styles'
import type { DrawerProps } from '@mui/material/Drawer'

import { paper } from '@/theme/css'

import { alpha } from '@mui/material/styles'
import { drawerClasses } from '@mui/material/Drawer'

export function drawer(theme: Theme) {
  const lightMode = theme.palette.mode === 'light'

  return {
    MuiDrawer: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: DrawerProps }) => ({
          ...(ownerState.variant === 'temporary' && {
            [`& .${drawerClasses.paper}`]: {
              ...paper({ theme }),
              ...(ownerState.anchor === 'left' && {
                boxShadow: `40px 40px 80px -8px ${alpha(
                  lightMode ? theme.palette.grey[500] : theme.palette.common.black,
                  0.24
                )}`,
              }),
              ...(ownerState.anchor === 'right' && {
                boxShadow: `-40px 40px 80px -8px ${alpha(
                  lightMode ? theme.palette.grey[500] : theme.palette.common.black,
                  0.24
                )}`,
              }),
            },
          }),
        }),
      },
    },
  }
}
