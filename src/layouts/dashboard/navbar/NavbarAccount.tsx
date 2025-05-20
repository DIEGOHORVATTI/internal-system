import { useState, MouseEvent } from 'react'

import { Box, Typography, useTheme } from '@mui/material'

import { IconButtonAnimate } from '@/components'

import useAuth from '@/hooks/useAuth'

import AccountPopover from '../header/AccountPopover'

import * as S from './styles'

type Props = {
  isCollapse: boolean | undefined
}

export const NavbarAccount = ({ isCollapse = false }: Props) => {
  const { user } = useAuth()
  const theme = useTheme()

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [open, setOpen] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
    setIsPopoverOpen(!isPopoverOpen)
  }

  return (
    <IconButtonAnimate
      onClick={handlePopoverOpen}
      sx={{
        ...S.ContainerAvatar(theme),
        ...(isCollapse && {
          bgcolor: 'transparent'
        }),
        width: '100%',
        justifyContent: 'left'
      }}
    >
      <AccountPopover handleOpen={open} isPopoverOpen={isPopoverOpen} setIsPopoverOpen={setIsPopoverOpen} />
      <Box
        sx={{
          ml: 2,
          transition: theme =>
            theme.transitions.create('width', {
              duration: theme.transitions.duration.shorter
            }),
          ...(isCollapse && {
            ml: 0,
            width: 0
          })
        }}
      >
        <Typography
          noWrap
          variant="subtitle2"
          sx={{
            maxWidth: '18ch',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {user?.name}
        </Typography>
      </Box>
    </IconButtonAnimate>
  )
}
