import type { Theme, SxProps } from '@mui/material/styles'

import Box from '@mui/material/Box'

type ScrollbarProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
  [key: string]: any
}

export default function Scrollbar({ children, sx = {}, ...other }: ScrollbarProps) {
  return (
    <Box
      sx={{
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
}
