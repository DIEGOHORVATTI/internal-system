import type { BoxProps } from '@mui/material/Box'

import Box from '@mui/material/Box'

export interface SvgColorProps extends BoxProps {
  src: string
}

export default function SvgColor({ src, sx, ...other }: SvgColorProps) {
  return (
    <Box
      component="span"
      className="svg-color"
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  )
}
