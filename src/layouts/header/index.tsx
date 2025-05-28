//
import { HEADER } from '@/config'
// theme
import { bgBlur } from '@/theme/css'
// components
import Logo from '@/components/logo'
import SvgColor from '@/components/svg-color'
import useSettings from '@/hooks/use-settings'
// hooks
import useOffSetTop from '@/hooks/use-off-set-top'
import useResponsive from '@/hooks/use-responsive'

import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
// @mui
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'

import SettingsButton from './components/settings-button'
import AccountPopover from './components/account-popover'
import NotificationsPopover from './components/notifications-popover'

export default function Header() {
  const theme = useTheme()

  const settings = useSettings()

  const isNavHorizontal = settings.themeLayout === 'horizontal'

  const lgUp = useResponsive('up', 'lg')

  const offset = useOffSetTop(HEADER.H_DESKTOP)

  const offsetTop = offset && !isNavHorizontal

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton /* onClick={onOpenNav} */>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <NotificationsPopover />

        <SettingsButton />

        <AccountPopover />
      </Stack>
    </>
  )

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        position: 'relative',
        width: '100%',
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  )
}
