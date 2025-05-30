import type { IconButtonProps } from '@mui/material'

import IconButtonAnimate from '@/components/icon-button-animate'

import { styled } from '@mui/material/styles'

export const ContainerButton = styled(IconButtonAnimate)<IconButtonProps>(({ theme }) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.grey[50012],
  alignItems: 'center',
  width: '100%',
  justifyContent: 'left',
  textAlign: 'left',
  position: 'relative',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}))
