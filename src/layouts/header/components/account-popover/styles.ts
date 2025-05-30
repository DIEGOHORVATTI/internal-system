import type { IconButtonProps } from '@mui/material'

import IconButtonAnimate from '@/components/icon-button-animate'

import { styled } from '@mui/material/styles'

export const ContainerAvatar = styled(IconButtonAnimate)<IconButtonProps>(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'left',
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.grey[50012],
  width: '100%',
  justifyContent: 'left',
  position: 'relative',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}))
