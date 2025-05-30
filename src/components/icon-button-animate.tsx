import type { ReactNode } from 'react'
import type { Variants } from 'framer-motion'
import type { IconButtonProps } from '@mui/material'

import { m } from 'framer-motion'

import { Box, IconButton } from '@mui/material'

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

const varSmall: Variants = {
  hover: { scale: 1.04 },
  tap: { scale: 0.95 },
}

const varMedium: Variants = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
}

const varLarge: Variants = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
}

export function AnimateWrap({ size = 'medium', children }: AnimateWrapProp) {
  const variant: Variants = {
    small: varSmall,
    medium: varMedium,
    large: varLarge,
  }[size]

  return (
    <Box component={m.div} whileTap="tap" whileHover="hover" variants={variant}>
      {children}
    </Box>
  )
}
