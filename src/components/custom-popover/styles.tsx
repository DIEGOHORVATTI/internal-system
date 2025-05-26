import { bgBlur } from '@/theme/css'

import { alpha, styled } from '@mui/material/styles'

import type { PopoverArrow } from './types'

export const StyledArrow = styled('span')<Pick<PopoverArrow, 'size' | 'placement'>>(
  ({ placement, theme, size = 14 }) => {
    const POSITION = -(size / 2) + 0.5

    const topStyle = {
      top: POSITION,
      transform: 'rotate(135deg)',
    }

    const bottomStyle = {
      bottom: POSITION,
      transform: 'rotate(-45deg)',
    }

    const leftStyle = {
      left: POSITION,
      transform: 'rotate(45deg)',
    }

    const rightStyle = {
      right: POSITION,
      transform: 'rotate(-135deg)',
    }

    return {
      width: size,
      height: size,
      position: 'absolute',
      borderBottomLeftRadius: size / 4,
      clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
      border: `solid 1px ${alpha(
        theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
        0.12
      )}`,
      ...bgBlur({
        color: theme.palette.background.paper,
      }),
      // Top
      ...(placement === 'top-left' && { ...topStyle, left: 20 }),
      ...(placement === 'top-center' && {
        ...topStyle,
        left: 0,
        right: 0,
        margin: 'auto',
      }),
      ...(placement === 'top-right' && { ...topStyle, right: 20 }),
      // Bottom
      ...(placement === 'bottom-left' && { ...bottomStyle, left: 20 }),
      ...(placement === 'bottom-center' && {
        ...bottomStyle,
        left: 0,
        right: 0,
        margin: 'auto',
      }),
      ...(placement === 'bottom-right' && { ...bottomStyle, right: 20 }),
      // Left
      ...(placement === 'left-top' && { ...leftStyle, top: 20 }),
      ...(placement === 'left-center' && {
        ...leftStyle,
        top: 0,
        bottom: 0,
        margin: 'auto',
      }),
      ...(placement === 'left-bottom' && { ...leftStyle, bottom: 20 }),
      // Right
      ...(placement === 'right-top' && { ...rightStyle, top: 20 }),
      ...(placement === 'right-center' && {
        ...rightStyle,
        top: 0,
        bottom: 0,
        margin: 'auto',
      }),
      ...(placement === 'right-bottom' && { ...rightStyle, bottom: 20 }),
    }
  }
)
