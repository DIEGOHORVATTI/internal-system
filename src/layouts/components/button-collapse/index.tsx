import type { ListItemProps } from '@mui/material/ListItem'
import type { ListItemTextProps } from '@mui/material/ListItemText'

import Stack from '@mui/material/Stack'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'

type Props = ListItemProps & {
  open: boolean
  active: boolean
  slotProps?: {
    listItemText?: ListItemTextProps
  }
}

export default function ButtonCollapse({ open, active, slotProps, children, ...props }: Props) {
  return (
    <ListItemButton
      component={Stack}
      direction="row"
      spacing={2}
      {...props}
      sx={{
        ...props.sx,
        width: 1,
        borderRadius: 1,
        bgcolor: 'background.paper',
        ...(open && {
          alignItems: 'center',
          bgcolor: 'transparent',
          '&:hover': { bgcolor: 'transparent' },
        }),
        ...(active && {
          color: 'primary.main',
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemIcon sx={{ m: 0 }}>{children}</ListItemIcon>

      {!open && <ListItemText {...slotProps?.listItemText} />}
    </ListItemButton>
  )
}
