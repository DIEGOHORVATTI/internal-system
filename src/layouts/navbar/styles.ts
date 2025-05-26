import type { ISettings } from '@/contexts/settings-provider'

import { NAVBAR } from '@/config'
import cssStyles from '@/utils/cssStyles'

import Drawer from '@mui/material/Drawer'
import styled from '@mui/material/styles/styled'
import IconButton from '@mui/material/IconButton'

export const DrawerStyle = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'modeLayout',
})<Pick<ISettings, 'modeLayout'>>(({ theme, modeLayout }) => ({
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
}))

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

export const NavbarVerticalRootStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'modeLayout',
})<Pick<ISettings, 'modeLayout'>>(({ theme, modeLayout }) => ({
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    width: modeLayout ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}))
