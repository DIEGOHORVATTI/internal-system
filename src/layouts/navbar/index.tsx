import type { Navigation } from '@/routes/nav-config'

import { NAVBAR } from '@/config'
import Logo from '@/components/logo'
import Iconify from '@/components/iconify'
import useSettings from '@/hooks/use-settings'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import useMediaQuery from '@mui/material/useMediaQuery'

import * as S from './styles'
import RenderNavItems from './components/render-nav-items'
import RenderNavItemsMini from './components/render-nav-items-mini'

export type NavbarVerticalProps = React.PropsWithChildren<{
  navConfig: Array<Navigation>
}>

export default function Navbar({ navConfig, children }: NavbarVerticalProps) {
  const theme = useTheme()

  const { modeLayout, onToggleModeLayout } = useSettings()

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isMobile = !isDesktop

  const navVertical = <RenderNavItems navConfig={navConfig} />

  const navMini = <RenderNavItemsMini navConfig={navConfig} />

  const renderContent = (
    <Stack spacing={2} py={3} alignItems="center">
      <Logo showTitle={!modeLayout} />

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

      <Container
        maxWidth={false}
        sx={{
          flexGrow: 1,
          py: (theme) => theme.spacing(2),
          px: (theme) => theme.spacing(4),
        }}
      >
        {children}
      </Container>
    </Stack>
  )
}
