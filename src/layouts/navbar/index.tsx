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
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

import * as S from './styles'
import RenderNavItems from './components/render-nav-items'
import RenderNavItemsMini from './components/render-nav-items-mini'
import RenderNavItemsMobile from './components/render-nav-items-mobile'

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
  const navMobile = <RenderNavItemsMobile navConfig={navConfig} />

  const renderContent = (
    <Stack spacing={2} py={3} alignItems="center">
      <Logo showTitle={!modeLayout} />

      <Box width={1} px={1}>
        {isMobile ? navMobile : modeLayout ? navMini : navVertical}
      </Box>
    </Stack>
  )

  return (
    <Stack direction="row">
      <S.NavbarVerticalRootStyle modeLayout={modeLayout}>
        {isDesktop && (
          <>
            <S.IconButtonStyle size="small\" onClick={onToggleModeLayout}>
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
          <>
            <IconButton 
              onClick={onToggleModeLayout}
              sx={{ 
                position: 'fixed',
                top: 8,
                left: 8,
                zIndex: 999,
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>

            <Drawer
              open={modeLayout}
              onClose={onToggleModeLayout}
              PaperProps={{ 
                sx: { 
                  width: '80%',
                  maxWidth: NAVBAR.DASHBOARD_WIDTH,
                  bgcolor: 'background.default',
                  backgroundImage: 'none'
                } 
              }}
            >
              {renderContent}
            </Drawer>
          </>
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