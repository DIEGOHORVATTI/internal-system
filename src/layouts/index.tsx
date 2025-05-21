import useCollapseDrawer from '@/hooks/use-collapse-drawer'

import { Box, Stack, Drawer, useTheme, useMediaQuery } from '@mui/material'

import Logo from '@/components/logo'
import { NavbarAccount } from './components/NavbarAccount'

import { NAVBAR } from '@/config'
import { paper } from '@/theme/css'
import cssStyles from '@/utils/cssStyles'

import IconButtonAnimate from '@/components/icon-button-animate'
import Iconify from '@/components/iconify'

import * as S from './components/styles'

import type { Navigation } from '@/routes/nav-config'

type Props = React.PropsWithChildren<{
  links: Array<Navigation>
}>

export default function NavbarVertical({}: /* links, children */ Props) {
  const theme = useTheme()

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer()

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isMobile = !isDesktop

  const renderContent = (
    <Box
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
      <Stack
        spacing={3}
        sx={{
          p: 2,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Logo />

          {isDesktop && !isCollapse && (
            <IconButtonAnimate onClick={onToggleCollapse}>
              <Iconify
                icon={
                  collapseClick
                    ? 'solar:double-alt-arrow-right-line-duotone'
                    : 'solar:double-alt-arrow-left-line-duotone'
                }
              />
            </IconButtonAnimate>
          )}
        </Stack>

        <NavbarAccount isCollapse={isCollapse} />
      </Stack>

      {/* <NavSectionVertical navConfig={NAVIGATION} isCollapse={isCollapse} /> */}
    </Box>
  )

  return (
    <S.NavbarVerticalRootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(isCollapse && {
          position: 'absolute',
        }),
      }}
    >
      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'dashed',
              bgcolor: 'background.default',
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.standard,
              }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...paper({ theme, dropdown: true }),
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
