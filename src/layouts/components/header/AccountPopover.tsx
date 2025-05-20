import { Fragment } from 'react'

import { MenuPopover, MyAvatar } from '@/components'

import useSettings from '@/hooks/use-settings'
import useAuth from '@/hooks/use-auth'

import { Box, Divider, Stack, MenuItem, Typography, Switch, Button } from '@mui/material'

const MENU_OPTIONS = [
  {
    label: 'Início',
    linkTo: '/',
  },
  {
    label: 'Perfil',
    linkTo: '/profile',
  },
]

type Props = {
  isPopoverOpen: boolean
  setIsPopoverOpen: (isPopoverOpen: boolean) => void
  handleOpen: HTMLElement | null
}

const AccountPopover = ({ isPopoverOpen, setIsPopoverOpen, handleOpen }: Props) => {
  const { logout } = useAuth()

  const { onToggleMode, themeMode } = useSettings()

  const handleCloseMenuPopover = () => {
    setIsPopoverOpen(false)
  }

  return (
    <Box>
      <Box
        sx={{
          p: 0,
          borderRadius: '50%',
          border: (theme) => `solid 3px ${theme.palette.grey[500_32]}`,
        }}
        onClick={(value) => {
          onToggleMode()
          value.stopPropagation()
        }}
      >
        <MyAvatar />
      </Box>

      {isPopoverOpen && (
        <MenuPopover
          open={Boolean(handleOpen)}
          anchorEl={handleOpen}
          onClose={handleCloseMenuPopover}
          sx={{
            p: 0,
            mt: 1.5,
            ml: 0.75,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          }}
        >
          <MenuItem>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2">
                {themeMode === 'dark' ? 'Escuro' : 'Claro'}
              </Typography>

              <Switch
                checked={themeMode === 'dark'}
                onClick={() => onToggleMode()}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
          </MenuItem>

          {MENU_OPTIONS.map((option, index) => (
            <Fragment key={index}>
              <a href={option.linkTo}>
                <MenuItem key={option.label} onClick={handleCloseMenuPopover}>
                  {option.label}
                </MenuItem>
              </a>

              <Divider sx={{ borderStyle: 'dashed' }} />
            </Fragment>
          ))}

          <MenuItem component={Button} fullWidth onClick={logout}>
            Sair
          </MenuItem>
        </MenuPopover>
      )}
    </Box>
  )
}

export default AccountPopover
