import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useTheme } from '@mui/material/styles'
import useResponsive from '@/hooks/use-responsive'
import useCollapseDrawer from '@/hooks/use-collapse-drawer'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'

import { NAVBAR } from '@/config'

import Logo from '@/components/logo'

import { NavSectionVertical } from '@/components/nav-section'

import { navConfig } from './NavConfig'

import { CollapseButton } from './CollapseButton'

import { NavbarAccount } from './NavbarAccount'

import cssStyles from '@/utils/cssStyles'
import * as S from './styles'

import { paper } from '@/theme/css'

type Props = {
  isOpenSidebar: boolean
  onCloseSidebar: VoidFunction
}

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }: Props) {
  const theme = useTheme()

  const { pathname } = useLocation()

  /* const { onChangeOpenSideBar } = useSettings() */

  const isDesktop = useResponsive('up', 'lg')

  const isMobile = useResponsive('down', 'lg')

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer()

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderContent = (
    <Box
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        overflow: 'auto',
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Logo />

          {isDesktop && !isCollapse && (
            <CollapseButton
              onToggleCollapse={() => {
                //onChangeOpenSideBar()
                onToggleCollapse()
              }}
              collapseClick={collapseClick}
            />
          )}
        </Stack>

        <NavbarAccount isCollapse={isCollapse} />
      </Stack>

      <NavSectionVertical sx={{ mt: -3 }} navConfig={navConfig} isCollapse={isCollapse} />

      <Box sx={{ flexGrow: 1 }} />
    </Box>
  )

  return (
    <S.NavbarVerticalRootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {isMobile && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

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
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...paper({ theme, dropdown: true }),
              ...cssStyles(theme).bgBlur(),
              ...(collapseHover && {
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </S.NavbarVerticalRootStyle>
  )
}
