import { useRef, useState, useEffect } from 'react'

type MutableRefObject<T> = {
  current: T
}

type EventType = 'resize' | 'scroll'

type UseRectStates = {
  screenHeight: number
  screenWidth: number
  rect?: DOMRect
}

export type UseRectProps<T extends HTMLDivElement | null = null> = {
  rect: DOMRect | undefined
  reference: MutableRefObject<T | null>
  screenHeight: number
  screenWidth: number
}

export type UseReactHookProps = {
  event?: EventType
  resizeOnAreaChange?: boolean
}

export const useRect = <T extends HTMLDivElement | null>({
  event = 'resize',
  resizeOnAreaChange,
}: UseReactHookProps): UseRectProps<T> => {
  const reference = useRef<T>(null)

  const [{ rect, screenHeight, screenWidth }, setState] = useState<UseRectStates>({
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth,
  })

  useEffect(() => {
    const handleResize = () => {
      setState({
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,
        rect: reference.current?.getBoundingClientRect(),
      })
    }

    window.addEventListener(event, handleResize)
    return () => window.removeEventListener(event, handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!reference.current) {
      return
    }

    const set = () =>
      setState((prev) => ({ ...prev, rect: reference.current?.getBoundingClientRect() }))

    set()

    setTimeout(set, 600)
  }, [reference, resizeOnAreaChange])

  return { rect, reference, screenHeight, screenWidth }
}
