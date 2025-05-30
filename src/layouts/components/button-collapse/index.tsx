import type { ListItemProps } from '@mui/material/ListItem'
import type { ListItemTextProps } from '@mui/material/ListItemText'

import ListItem from '@mui/material/ListItem'
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
    <ListItem
      disablePadding
      {...props}
      sx={{
        ...props.sx,
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
      <ListItemButton>
        <ListItemIcon>{children}</ListItemIcon>

        <ListItemText {...slotProps?.listItemText} />
      </ListItemButton>
    </ListItem>
  )
}
