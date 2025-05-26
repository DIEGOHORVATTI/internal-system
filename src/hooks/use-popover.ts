import type { PopoverProps } from '@mui/material/Popover'

import { useState, useCallback } from 'react'

export function usePopover() {
  const [anchorEl, setAnchorEl] = useState<PopoverProps['anchorEl']>(null)

  const onOpen = useCallback((event: React.MouseEvent<PopoverProps['anchorEl']>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const onClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return {
    open: !!anchorEl,
    anchorEl,
    onOpen,
    onClose,
    setAnchorEl,
  }
}
