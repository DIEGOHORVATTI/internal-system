import { styled } from '@mui/material/styles'
import { IconButton, type IconButtonProps } from '@mui/material'

export const ContainerButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.grey[50012],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}))
