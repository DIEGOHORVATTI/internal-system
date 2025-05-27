'use client'

import { alpha, Box } from '@mui/material'
import { keyframes, styled } from '@mui/material/styles'

export const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}))

const changeWallpaper = keyframes`
  0% { filter: hue-rotate(0) }
  50% { filter: hue-rotate(7deg) }
  100% { filter: hue-rotate(0) }
`

export const Container = styled(Box)(({ theme }) => ({
  backgroundImage: `linear-gradient(to right bottom, ${theme.palette.warning.light} 5%, ${theme.palette.warning.main}, ${theme.palette.warning.light})`,
  animation: `${changeWallpaper} 10s linear infinite`,
  backgroundBlendMode: 'hard-light',
  width: '100%',
  height: '100%',
  position: 'fixed',
  padding: theme.spacing(3, 3, 0),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex'
}))

export const Content = styled(Box)(({ theme }) => ({
  margin: 'auto',
  maxWidth: 450,
  width: '100%',
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[800],
  backdropFilter: '20px',
  padding: '20px',
  borderRadius: '20px',
  border: `3px solid ${theme.palette.warning.light}`,
  flexDirection: 'column',
  justifyContent: 'center'
}))
