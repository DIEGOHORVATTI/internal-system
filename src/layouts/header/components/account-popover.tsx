import { m } from 'framer-motion'
// routes
import { PATHS } from '@/routes/paths'
// auth
import useAuth from '@/hooks/use-auth'
import useRouter from '@/hooks/use-router'
// Notistack
import { enqueueSnackbar } from 'notistack'
import usePopover from '@/hooks/use-popover'
// components
import { varHover } from '@/components/animate'
// hooks
import { useMockedUser } from '@/hooks/use-mocked-user'
import CustomPopover from '@/components/custom-popover'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
// @mui
import { alpha } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Calendario',
    linkTo: PATHS.calendar,
  },
  {
    label: 'Contato',
    linkTo: PATHS.contact,
  },
]

export default function AccountPopover() {
  const { navigateTo } = useRouter()

  const { user } = useMockedUser()

  const { logout } = useAuth()

  const { open, onClose, onOpen } = usePopover()

  const handleLogout = async () => {
    try {
      await logout()

      onClose()
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Unable to logout!', { variant: 'error' })
    }
  }

  const handleClickItem = (path: string) => {
    onClose()

    navigateTo(path)
  }

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: 'background.neltral',
          }),
        }}
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover open={open} onClose={onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  )
}
