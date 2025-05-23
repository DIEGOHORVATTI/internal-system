import { ReactNode } from 'react'

import { Box, IconButton, IconButtonProps } from '@mui/material'

import { m } from 'framer-motion'

type AnimateWrapProp = {
  children: ReactNode
  size: 'small' | 'medium' | 'large'
}

export default function IconButtonAnimate({
  children,
  size = 'medium',
  ...other
}: IconButtonProps) {
  return (
    <AnimateWrap size={size}>
      <IconButton size={size} {...other}>
        {children}
      </IconButton>
    </AnimateWrap>
  )
}

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
}

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
}

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
}

export function AnimateWrap({ size, children }: AnimateWrapProp) {
  const isSmall = size === 'small'
  const isLarge = size === 'large'

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex',
      }}
    >
      {children}
    </Box>
  )
}
