import type { PopoverOrigin } from '@mui/material/Popover'

import Popover from '@mui/material/Popover'
// @mui
import { menuItemClasses } from '@mui/material/MenuItem'

//
import { getPosition } from './utils'
import { StyledArrow } from './styles'

import type { CustomPopoverProps } from './types'

export default function CustomPopover({
  open,
  anchorEl,
  children,
  arrow = 'top-right',
  hiddenArrow,
  sx,
  ...other
}: CustomPopoverProps) {
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
            overflow: 'inherit',
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
