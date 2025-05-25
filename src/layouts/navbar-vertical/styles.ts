import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import { NAVBAR } from '@/config'

import cssStyles from '@/utils/cssStyles'
import styled from '@mui/material/styles/styled'

import type { ISettings } from '@/contexts/settings-provider'

export const DrawerStyle = styled(Drawer)<Pick<ISettings, 'modeLayout'>>(
  ({ theme, modeLayout }) => ({
    '& .MuiDrawer-paper': {
      borderRightStyle: 'double',
      borderColor: 'grey.50012',
      bgcolor: 'background.default',
      borderRadius: 0,
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.standard,
      }),
      width: NAVBAR.DASHBOARD_WIDTH,
      ...(modeLayout && {
        width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
      }),
      ...cssStyles(theme).bgBlur(),
    },
  })
)

export const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  zIndex: 9999,
  position: 'absolute',
  right: -15,
  top: theme.spacing(3),
  border: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.grey[50012],
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}))

export const NavbarVerticalRootStyle = styled('div')<Pick<ISettings, 'modeLayout'>>(
  ({ theme, modeLayout }) => ({
    width: '100%',
    position: 'relative',
    ...(modeLayout && {
      position: 'absolute',
    }),
    [theme.breakpoints.up('lg')]: {
      width: modeLayout ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
      flexShrink: 0,
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.shorter,
      }),
    },
  })
)
