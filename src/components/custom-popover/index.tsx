import { menuItemClasses } from '@mui/material/MenuItem'
import Popover, { PopoverOrigin } from '@mui/material/Popover'

import { getPosition } from './utils'
import { StyledArrow } from './styles'
import { MenuPopoverProps } from './types'

export default function CustomPopover({
  open,
  anchorEl,
  children,
  arrow = 'top-right',
  hiddenArrow,
  sx,
  ...other
}: MenuPopoverProps) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow)

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin as PopoverOrigin}
      transformOrigin={transformOrigin as PopoverOrigin}
      slotProps={{
        paper: {
          sx: {
            width: 'auto',
            boxShadow: 'none',
            overflow: 'unset',
            backdropFilter: 'none',
            background: 'transparent',
            padding: (theme) => theme.spacing(0, 0.75),
            ...style,
            [`& .${menuItemClasses.root}`]: {
              '& svg': {
                mr: 2,
                flexShrink: 0,
              },
            },
            ...sx,
          },
        },
      }}
      {...other}
    >
      {!hiddenArrow && <StyledArrow arrow={arrow} />}

      {children}
    </Popover>
  )
}
