import type { BoxProps, ListItemTextProps } from '@mui/material'

import Stack from '@mui/material/Stack'
import ListItemText from '@mui/material/ListItemText'

import { ContainerButton } from './styles'

type Props = BoxProps & {
  open: boolean
  active: boolean
  slotProps?: {
    listItemText?: ListItemTextProps
  }
}

export default function ButtonCollapse({ open, active, slotProps, children, ...props }: Props) {
  return (
    <Stack
      component={ContainerButton}
      direction="row"
      spacing={2}
      size={open ? 'medium' : 'small'}
      {...props}
      sx={{
        ...(open && {
          alignItems: 'center',
          bgcolor: 'transparent',
          '&:hover': { bgcolor: 'transparent' },
        }),
        ...(active && {
          color: 'primary.main',
        }),
      }}
    >
      {children}

      {!open && (
        <ListItemText
          {...slotProps?.listItemText}
          slotProps={{
            ...slotProps?.listItemText?.slotProps,
            primary: {
              noWrap: true,
            },
          }}
          sx={{ width: 1, textAlign: 'center' }}
        />
      )}
    </Stack>
  )
}
