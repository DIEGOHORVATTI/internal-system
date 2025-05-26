import { useTheme } from '@mui/material/styles'
import useSettings from '@/hooks/use-settings'
import useMediaQuery from '@mui/material/useMediaQuery'

import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Logo from '@/components/logo'

import { NAVBAR } from '@/config'

import Iconify from '@/components/iconify'
import renderNavItems from './components/render-nav-items'
import renderNavItemsMini from './components/render-nav-items-mini'
import * as S from './styles'

import type { Navigation } from '@/routes/nav-config'

export type NavbarVerticalProps = React.PropsWithChildren<{
  navConfig: Array<Navigation>
}>

export default function Navbar({ navConfig, children }: NavbarVerticalProps) {
  const theme = useTheme()

  const { modeLayout, onToggleModeLayout } = useSettings()

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isMobile = !isDesktop

  const navVertical = renderNavItems({ navConfig })

  const navMini = renderNavItemsMini({ navConfig })

  const renderContent = (
    <Stack spacing={2} py={3} alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <Logo />

        {!modeLayout && (
          <Typography variant="h4" gutterBottom>
            Azeplast
          </Typography>
        )}
      </Stack>

      <Box width={1} px={1}>
        {modeLayout ? navMini : navVertical}
      </Box>
    </Stack>
  )

  return (
    <Stack direction="row">
      <S.NavbarVerticalRootStyle modeLayout={modeLayout}>
        {isDesktop && (
          <>
            <S.IconButtonStyle size="small" onClick={onToggleModeLayout}>
              <Iconify
                size={1.5}
                icon={modeLayout ? 'ep:arrow-right-bold' : 'ep:arrow-left-bold'}
              />
            </S.IconButtonStyle>

            <S.DrawerStyle open variant="persistent" modeLayout={modeLayout}>
              {renderContent}
            </S.DrawerStyle>
          </>
        )}

        {isMobile && (
          <Drawer
            open={modeLayout}
            onClose={onToggleModeLayout}
            PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
          >
            {renderContent}
          </Drawer>
        )}
      </S.NavbarVerticalRootStyle>

      {children}
    </Stack>
  )
}
