import type { Dispatch, RefObject, SetStateAction } from 'react'

import { useRef, useState, useCallback } from 'react'

type UsePopoverHoverReturn<T extends HTMLElement = HTMLElement> = {
  open: boolean
  anchorEl: T | null
  onOpen: () => void
  onClose: () => void
  elementRef: RefObject<T>
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function usePopoverHover<T extends HTMLElement = HTMLElement>(
  inputRef?: RefObject<T | null>
): UsePopoverHoverReturn<T> {
  const localRef = useRef<T>(null)
  const elementRef = (inputRef || localRef) as RefObject<T>

  const [open, setOpen] = useState<boolean>(false)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  return {
    elementRef,
    anchorEl: elementRef.current,
    open,
    onOpen,
    onClose,
    setOpen,
  }
}
