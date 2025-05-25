import useCollapseDrawer from '@/hooks/use-collapse-drawer'

import { Stack, Drawer, useTheme, useMediaQuery, Typography, IconButton } from '@mui/material'

import Logo from '@/components/logo'

import { NAVBAR } from '@/config'

import cssStyles from '@/utils/cssStyles'

import Iconify from '@/components/iconify'
import renderNavItems from './components/render-nav-items'
import renderNavItemsMini from './components/render-nav-items-mini'
import * as S from './styles'

import type { Navigation } from '@/routes/nav-config'

export type NavbarVerticalProps = React.PropsWithChildren<{
  navConfig: Array<Navigation>
}>

export default function NavbarVertical({ navConfig }: NavbarVerticalProps) {
  const theme = useTheme()

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse } = useCollapseDrawer()

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isMobile = !isDesktop

  const navVertical = renderNavItems({ navConfig })

  const navMini = renderNavItemsMini({ navConfig })

  const renderContent = (
    <Stack
      spacing={2}
      py={3}
      alignItems="center"
      sx={{
        height: 1,
        overflow: 'auto',
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Logo />

        {!isCollapse && (
          <Typography variant="h4" gutterBottom>
            Azeplast
          </Typography>
        )}
      </Stack>

      {isCollapse ? navMini : navVertical}
    </Stack>
  )

  return (
    <S.NavbarVerticalRootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        position: 'relative',
        ...(isCollapse && {
          position: 'absolute',
        }),
      }}
    >
      {isDesktop && (
        <IconButton
          size="small"
          onClick={onToggleCollapse}
          sx={{
            zIndex: 9999,
            position: 'absolute',
            right: -15,
            top: theme.spacing(3),
            border: 1,
            borderColor: 'grey.50012',
            backgroundColor: theme.palette.background.default,
            '&:hover': {
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          <Iconify size={1.5} icon={collapseClick ? 'ep:arrow-right-bold' : 'ep:arrow-left-bold'} />
        </IconButton>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'double',
              borderColor: 'grey.50012',
              bgcolor: 'background.default',
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.standard,
              }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...cssStyles(theme).bgBlur(),
              borderRadius: 0,
              ...(collapseHover && {
                boxShadow: theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          open={isCollapse}
          onClose={onToggleCollapse}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}
    </S.NavbarVerticalRootStyle>
  )
}
