import type { BoxProps } from '@mui/material'

import { useRect, type UseRectProps, type UseReactHookProps } from '@/hooks/use-rect'

import Box from '@mui/material/Box'

type RectangleProps = Omit<UseRectProps, 'reference'> & {
  calcHeight: (num: number) => number
}

type Props = UseReactHookProps &
  Omit<BoxProps, 'children'> & {
    children: (props: RectangleProps) => React.ReactNode
  }

export default function RectWrapper({ children, event, resizeOnAreaChange, ...rest }: Props) {
  const { reference, ...props } = useRect({ event, resizeOnAreaChange })

  const calcHeight = (num: number) => props?.screenHeight - (props?.rect?.top || 0) - num

  return (
    <Box ref={reference} {...rest}>
      {children({ ...props, calcHeight })}
    </Box>
  )
}
