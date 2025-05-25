import { useTheme } from '@mui/material/styles'
import useSettings from '@/hooks/use-settings'

import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

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
    <S.NavbarVerticalRootStyle modeLayout={modeLayout}>
      {isDesktop && (
        <IconButton
          size="small"
          onClick={onToggleModeLayout}
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
          <Iconify size={1.5} icon={modeLayout ? 'ep:arrow-right-bold' : 'ep:arrow-left-bold'} />
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
              ...(modeLayout && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...cssStyles(theme).bgBlur(),
              borderRadius: 0,
            },
          }}
        >
          {renderContent}
        </Drawer>
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
  )
}
