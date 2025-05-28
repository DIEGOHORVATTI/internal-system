import { NAVBAR, BREAKPOINT_MOBILE } from '@/config'

import Drawer from '@mui/material/Drawer'
import styled from '@mui/material/styles/styled'
import IconButton from '@mui/material/IconButton'

type LayoutSettings = {
  isMobile: boolean
  modeLayout: boolean
}

export const DrawerStyle = styled(Drawer, {
  shouldForwardProp: (prop: string) => !['modeLayout', 'isMobile'].includes(prop),
})<Partial<LayoutSettings>>(({ theme, modeLayout, isMobile }) => ({
  '& .MuiDrawer-paper': {
    borderRightStyle: 'double',
    borderColor: 'grey.50012',
    bgcolor: 'background.default',
    borderRadius: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.standard,
    }),
    backgroundColor: theme.palette.background.default,
    width: NAVBAR.DASHBOARD_WIDTH,
    ...(modeLayout && {
      width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
    ...(isMobile && {
      width: '100%',
    }),
  },
}))

export const IconButtonStyle = styled(IconButton, {
  shouldForwardProp: (prop: string) => !['modeLayout', 'isMobile'].includes(prop),
})<Pick<LayoutSettings, 'modeLayout'>>(({ theme, modeLayout }) => ({
  zIndex: 9999,
  position: 'fixed',
  left: (modeLayout ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH) - 15,
  top: theme.spacing(3),
  border: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.grey[50012],
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create('left', {
    duration: theme.transitions.duration.shorter,
  }),
  flexShrink: 0,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}))

export const NavbarVerticalRootStyle = styled('div', {
  shouldForwardProp: (prop: string) => !['modeLayout', 'isMobile'].includes(prop),
})<LayoutSettings>(({ theme, modeLayout, isMobile }) => ({
  position: 'relative',
  [theme.breakpoints.down(BREAKPOINT_MOBILE)]: {
    position: 'absolute',
  },
  width: isMobile ? '100%' : modeLayout ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
  flexShrink: 0,
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
  }),
}))
