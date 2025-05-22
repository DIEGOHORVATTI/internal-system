import useCollapseDrawer from '@/hooks/use-collapse-drawer'

import {
  Box,
  Stack,
  Drawer,
  useTheme,
  useMediaQuery,
  Paper,
  Card,
  IconButton,
  Typography,
} from '@mui/material'

import Logo from '@/components/logo'

import { NAVBAR } from '@/config'
import { paper } from '@/theme/css'
import cssStyles from '@/utils/cssStyles'

import IconButtonAnimate from '@/components/icon-button-animate'
import Iconify from '@/components/iconify'
import NavSectionVertical from './components/nav-section-vertical'

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

  const renderContent = (
    <Stack
      spacing={1}
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

      <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} />
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
        <IconButtonAnimate
          size="small"
          onClick={onToggleCollapse}
          sx={{
            zIndex: 9999,
            position: 'absolute',
            right: -15,
            border: 1,
            borderColor: 'grey.50012',
            backgroundColor: (theme) => theme.palette.background.default,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.background.default,
            },
          }}
        >
          <Iconify size={1.5} icon={collapseClick ? 'ep:arrow-right-bold' : 'ep:arrow-left-bold'} />
        </IconButtonAnimate>
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
