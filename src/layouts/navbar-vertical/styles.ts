import { styled } from '@mui/material/styles'

import { NAVBAR } from '@/config'
import { Drawer } from '@mui/material'
import cssStyles from '../../utils/cssStyles'

export const DrawerStyle = styled(Drawer)<{ modeLayout: boolean }>(({ theme, modeLayout }) => ({
  '& .MuiDrawer-paper': {
    borderRightStyle: 'double',
    borderColor: 'grey.50012',
    bgcolor: 'background.default',
    borderRadius: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.standard,
    }),
    ...cssStyles(theme).bgBlur(),
    width: NAVBAR.DASHBOARD_WIDTH,
    ...(modeLayout && {
      width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}))

export const NavbarVerticalRootStyle = styled('div')<{ modeLayout: boolean }>(
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
