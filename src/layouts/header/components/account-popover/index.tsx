// routes
import { PATHS } from '@/routes/paths'
// auth
import useAuth from '@/hooks/use-auth'
import useRouter from '@/hooks/use-router'
// Notistack
import { enqueueSnackbar } from 'notistack'
import usePopover from '@/hooks/use-popover'
// components
// hooks
import { useMockedUser } from '@/hooks/use-mocked-user'
import CustomPopover from '@/components/custom-popover'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
// @mui
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Avatar, IconButton, ListItemText } from '@mui/material'

import { ContainerAvatar } from './styles'

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

type Props = {
  open: boolean
}

export default function AccountPopover({ open }: Props) {
  const { navigateTo } = useRouter()

  const { user } = useMockedUser()

  const { logout } = useAuth()

  const popover = usePopover()

  const handleLogout = async () => {
    try {
      await logout()

      popover.onClose()
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Unable to logout!', { variant: 'error' })
    }
  }

  const handleClickItem = (path: string) => {
    popover.onClose()

    navigateTo(path)
  }

  return (
    <>
      <ContainerAvatar
        onClick={popover.onOpen}
        size={open ? 'medium' : 'small'}
        sx={{
          ...(open && {
            alignItems: 'center',
            bgcolor: 'transparent',
            '&:hover': { bgcolor: 'transparent' },
          }),
        }}
      >
        <IconButton onClick={popover.onOpen} color="inherit">
          <Avatar src={user?.photoURL} alt={user?.displayName} />
        </IconButton>

        <ListItemText
          primary={user?.displayName}
          secondary={user?.email}
          primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
          secondaryTypographyProps={{ variant: 'body2', noWrap: true, color: 'text.secondary' }}
          sx={{ width: 1, textAlign: 'center' }}
        />
      </ContainerAvatar>

      <CustomPopover
        hiddenArrow
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
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
