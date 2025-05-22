import { Theme, styled } from '@mui/material/styles'

export const ContainerAvatar = (theme: Theme) => {
  return {
    alignItems: 'center',
    textAlign: 'left',
    padding: theme.spacing(2),
    borderRadius: Number(theme.shape.borderRadius) * 0.2,
    backgroundColor: theme.palette.grey[500_12],
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  }
}

export const NavbarVerticalRootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}))
