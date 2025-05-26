import { useState, useCallback } from 'react'

type ReturnType = {
  rect: DOMRect | undefined
  onClose: VoidFunction
  open: HTMLElement | null
  onOpen: (event: React.MouseEvent<HTMLElement>) => void
  setOpen: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

export default function usePopover(): ReturnType {
  const [open, setOpen] = useState<HTMLElement | null>(null)

  const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget)
  }, [])

  const onClose = useCallback(() => {
    setOpen(null)
  }, [])

  const rect = open?.getBoundingClientRect()

  return {
    rect,
    open,
    onOpen,
    onClose,
    setOpen,
  }
}
