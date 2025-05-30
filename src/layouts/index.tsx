import type { Navigation } from '@/routes/nav-config'

import Logo from '@/components/logo'
import Iconify from '@/components/iconify'
import { BREAKPOINT_MOBILE } from '@/constants/config'
import useSettings from '@/hooks/use-settings'

import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

import * as S from './styles'
import RecursiveMiniNavItems from './mini'
import RecursiveMobileNavItems from './mobile'
import RecursiveDesktopNavItems from './desktop'
import AccountPopover from './header/components/account-popover'
import SettingsButton from './header/components/settings-button'
import NotificationsPopover from './header/components/notifications-popover'

export type NavbarVerticalProps = React.PropsWithChildren<{
  navConfig: Array<Navigation>
}>

export default function Navbar({ navConfig, children }: NavbarVerticalProps) {
  const theme = useTheme()

  const { themeLayout, themeStretch, onToggleLayot } = useSettings()

  const isDesktop = useMediaQuery(theme.breakpoints.up(BREAKPOINT_MOBILE))
  const isMobile = !isDesktop

  const navVertical = <RecursiveDesktopNavItems navConfig={navConfig} />
  const navMini = <RecursiveMiniNavItems navConfig={navConfig} />
  const navMobile = <RecursiveMobileNavItems navConfig={navConfig} />

  const modeLayout = themeLayout === 'mini'
  const themeLayoutToggle = () => onToggleLayot(modeLayout ? 'vertical' : 'mini')

  const renderContent = (
    <Stack justifyContent="space-between" height={1} width={1} px={1} py={2}>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Logo showTitle={!modeLayout} />

        <AccountPopover open={modeLayout} />

        {isMobile && navMobile}

        {isDesktop && modeLayout && navMini}

        {isDesktop && !modeLayout && navVertical}
      </Stack>

      <Stack spacing={1}>
        <NotificationsPopover open={modeLayout} />

        <SettingsButton open={modeLayout} />
      </Stack>
    </Stack>
  )

  return (
    <Stack direction="row" width={1}>
      <S.NavbarVerticalRootStyle modeLayout={modeLayout} isMobile={isMobile}>
        {isDesktop && (
          <S.DrawerStyle open variant="persistent" modeLayout={modeLayout}>
            <S.IconButtonStyle size="small" modeLayout={modeLayout} onClick={themeLayoutToggle}>
              <Iconify
                size={1.5}
                icon={modeLayout ? 'ep:arrow-right-bold' : 'ep:arrow-left-bold'}
              />
            </S.IconButtonStyle>

            {renderContent}
          </S.DrawerStyle>
        )}

        {isMobile && (
          <>
            <IconButton
              onClick={themeLayoutToggle}
              sx={{
                position: 'fixed',
                top: 8,
                left: 8,
                zIndex: 999,
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>

            <S.DrawerStyle
              open={modeLayout}
              variant="persistent"
              isMobile={isMobile}
              onClose={themeLayoutToggle}
            >
              {renderContent}

              <IconButton
                onClick={themeLayoutToggle}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 999,
                  bgcolor: 'background.neutral',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </S.DrawerStyle>
          </>
        )}
      </S.NavbarVerticalRootStyle>

      <Container
        maxWidth={themeStretch ? false : 'lg'}
        sx={{ flexGrow: 1, py: (theme) => theme.spacing(2), px: (theme) => theme.spacing(4) }}
      >
        {children}
      </Container>
    </Stack>
  )
}
